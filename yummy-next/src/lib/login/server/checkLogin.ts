import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


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

        const data = await res.json(); // ✅ 여기서 응답 JSON 파싱
        //console.log('응답 데이터:', data);

        if (data.code === 'SUCCESS') {
            redirect('/'); // ✅ 로그인된 상태면 리다이렉트
        }
    }
}