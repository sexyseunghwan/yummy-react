import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';


/**
 * 로그인 상태 체크 함수
 * @param apiBaseUrl 
 */
export async function checkLoginAndRedirect(apiBaseUrl: string) {
    
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('yummy-access-token')?.value;

    if (accessToken) {
        const cookieHeader = `yummy-access-token=${accessToken};`;

        const res = await fetch(`${apiBaseUrl}/login/auth/loginCheck`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
            },
        });

        const data = await res.json(); 
        
        if (data !== 'AUTH_ERROR') {
            redirect('/'); /* 로그인된 상태면 리다이렉트 */
        }

    }
}

// export async function checkKakaoLoginAndRedirect(apiBaseUrl: string, code: string) {
    
//     const response = await fetch(`${apiBaseUrl}/login/ouath2/kakao`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ code }),
//         credentials: 'include',
//     });

//     const result = await response.json();

//     return result === "SUCCESS"
// }