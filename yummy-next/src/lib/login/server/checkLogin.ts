import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import axios from 'axios';

/**
 * 로그인 상태 체크 함수
 * @param apiBaseUrl 
 */
export async function checkLoginAndRedirect(apiBaseUrl: string) {
    
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('yummy-access-token')?.value;
    const userIdHash = cookieStore.get('yummy-user-id')?.value;

    if (accessToken && userIdHash) {
        const cookieHeader = `yummy-access-token=${accessToken}; yummy-user-id=${userIdHash}`;

        axios.post(`${apiBaseUrl}/login/auth/loginCheck`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Cookie: cookieHeader,
                    }
                }
            )
            .then(res => {
                if (res.status === 200) {
                    redirect("/");
                }
            })
            .catch(err => {
                console.error('토큰 검증 중 에러 발생:', err);
            });
    }
}