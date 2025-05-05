import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api|css|js|static).*)',
    ],
};
  

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const PUBLIC_PATHS = ['/changePasswd']; 
    
    /* 비밀번호 변경 페이지는 리디렉션 예외 처리 */
    if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }
    
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    
    const accessToken = request.cookies.get('yummy-access-token')?.value;
    
    /* access token 있는 경우에만 처리 -> 임시비밀번호 발급한 경우에 무조건 비밀번호 변경을 유도하기 위함임 */
    if (accessToken) {
        const cookieHeader = `yummy-access-token=${accessToken};`;

        const res = await fetch(`${apiBaseUrl}/login/auth/loginCheck`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
            },
            credentials: 'include'
        })

        const resp = await res.json();

        if (resp.publicStatus === 'TEMP_PW_CHECK') {
            return NextResponse.redirect(new URL('/changePasswd', request.url));
        }
    }

    return NextResponse.next();
}