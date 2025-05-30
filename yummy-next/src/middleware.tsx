import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const OAUTH_BYPASS_PATHS = ['/selectOauthProcess', '/joinMember', '/connectExistUser'];
const PUBLIC_PATHS = ['/changePasswd'];

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api|css|js|static).*)',
    ],
};


/**
 * changePasswd url 을 검사에서 제외시키기 위한 함수
 * 그렇지 않으면 /changePasswd 도 같이 검사하므로 페이지가 안뜰 것이다. 
 * @param pathname 
 * @returns 
 */
function isPublicPath(pathname: string): boolean {
    return PUBLIC_PATHS.some(path => pathname.startsWith(path));
}

/**
 * 토큰 추출 함수
 * @param request 
 * @param tokenName 
 * @returns 
 */
function getToken(request: NextRequest, tokenName: string): string | null {
    return request.cookies.get(tokenName)?.value || null;
}

/**
 * 서버에 토큰 상태 체크 함수
 * @param apiBaseUrl 
 * @param accessToken 
 * @returns 
 */
async function isTemporaryPassword(apiBaseUrl: string, accessToken: string): Promise<boolean> {
    const res = await fetch(`${apiBaseUrl}/login/auth/loginCheck`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `yummy-access-token=${accessToken};`,
        },
        credentials: 'include',
    });

    const data = await res.json();
    return data.publicStatus === 'TEMP_PW_CHECK';
}

/**
 * Oauth 관련 토큰의 유효성을 검증해주는 api
 * @param apiBaseUrl 
 * @param oauthToken 
 * @returns 
 */
async function isOauthTokenValid(apiBaseUrl: string, oauthToken: string): Promise<boolean> {

    const res = await fetch(`${apiBaseUrl}/login/oauth2/tokenValid`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `yummy-oauth-token=${oauthToken};`,
        },
        credentials: 'include'
    })

    const data = await res.json();
    return data === "SUCCESS";

}


/**
 * main 미들웨어 함수
 * @param request 
 * @returns 
 */
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    
    if (isPublicPath(request.nextUrl.pathname)) {
        return NextResponse.next(); // middleware 검사 스킵
    }

    /* 1. access token 이지만, 임시 비밀번호를 발급받은 유저의 어쎄스 토큰인 경우 -> 비밀번호 수정 페이지로 이동해준다. */
    const accessToken = getToken(request, 'yummy-access-token');
    if (accessToken && await isTemporaryPassword(apiBaseUrl, accessToken)) {
        return NextResponse.redirect(new URL('/changePasswd', request.url));
    }
    
    /* OAuth 토큰이 있으면 검증해준다. */
    const oauthToken = getToken(request, 'yummy-oauth-token'); 
    
    if (oauthToken) {
        const tokenValid = await isOauthTokenValid(apiBaseUrl, oauthToken);
        
        /* 토큰이 유효한 경우 -> Oauth를 통한 회원가입 또는 유저연동 진행 */
        if (tokenValid && !OAUTH_BYPASS_PATHS.includes(pathname)) {
            return NextResponse.redirect(new URL('/selectOauthProcess', request.url));
        } 
        
        /* 토큰이 유효하지 않은 경우 -> Oauth 토큰 제거 */
        if (!tokenValid && pathname !== '/') {
            return NextResponse.redirect(new URL('/api/cookieDelete?cookie=yummy-oauth-token', request.url));
        }
    }

    return NextResponse.next();
}