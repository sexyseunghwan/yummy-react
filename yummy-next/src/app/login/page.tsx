import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import axios from 'axios';
import LoginForm from './LoginForm';
import { Suspense } from 'react';

export default async function Login() {
    
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('yummy-access-token')?.value;
    const userIdHash = cookieStore.get('yummy-user-id')?.value;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (accessToken && userIdHash) {
        const cookieHeader = `yummy-access-token=${accessToken}; yummy-user-id=${userIdHash}`;

        let resp;

        try {

            resp = await axios.post(
                `${apiBaseUrl}/login/auth/loginCheck`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Cookie: cookieHeader,
                    }
                }
            );

        } catch(err) {
            console.error('토큰 검증 중 에러 발생:', err); 
        }

        if (resp != null && resp.status === 200) {
            redirect("/");
        }
    }


    return (
        <>
            <link rel="stylesheet" href="/css/login.css" />

            <div className="login-container" id="login-container">
                <h1>로그인하기</h1>
                <p>로그인하여 다양한 기능을 사용하세요.</p>
                <Suspense fallback={<div>Loading login form...</div>}>
                    <LoginForm/>
                </Suspense>
                
            </div>
        </>
    );
}