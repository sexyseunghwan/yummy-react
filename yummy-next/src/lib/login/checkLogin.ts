import axios from 'axios';
import { cookies } from 'next/headers';

export async function checkLogin(apiBaseUrl: string) {
    
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('yummy-access-token')?.value;
    const userIdHash = cookieStore.get('yummy-user-id')?.value;

    if (accessToken && userIdHash) {
        
        const cookieHeader = `yummy-access-token=${accessToken}; yummy-user-id=${userIdHash}`;

        try {
        
            const resp = await axios.post(
                `${apiBaseUrl}/login/auth/loginCheck`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Cookie: cookieHeader,
                    }
                }
            );
    
            if (resp.status === 200) {
                return resp.data; /* 사용자 정보 반환 */ 
            } else {
                return null; /* 로그인되지 않음 */ 
            }
    
        } catch (err) {
            console.error('로그인 확인 실패:', err);
            return null;
        }

    }


}