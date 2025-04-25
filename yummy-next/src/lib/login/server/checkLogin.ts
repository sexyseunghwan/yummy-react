import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { useUser } from '@/context/UserContext';


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
        
        if (data.code !== 'AUTH_ERROR') {
            redirect('/'); /* 로그인된 상태면 리다이렉트 */
        }

    }
}