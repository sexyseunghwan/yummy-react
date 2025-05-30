import { NextResponse } from 'next/server'

/**
 * 미들웨어단에서 쿠키를 제거하기 위한 api 함수수
 * @param request 
 * @returns 
 */
export async function GET(request: Request) {
    const url = new URL(request.url);
    const redirectUrl = `${url.origin}/`;

    const cookieName = url.searchParams.get('cookie') || '';

    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set(cookieName, '', {
        maxAge: 0,
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
    })

  return response
}