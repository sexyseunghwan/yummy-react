export const dynamic = 'force-dynamic';

import LoginForm from './LoginForm';
import { checkLoginAndRedirect } from '@/lib/server/auth/login/checkLogin';

// interface LoginPageProps {
//     // NOTE: searchParams is now a Promise of an object
//     searchParams: Promise<{ code?: string }>;
// }

/* Server Component */
export default async function Login() {
    
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    
    /* 로그인이 되었는지 판단. */
    await checkLoginAndRedirect(apiBaseUrl);
    
    return (
        <>
            <link rel="stylesheet" href="/css/login.css" />

            <div className="login-container" id="login-container">
                <h1>로그인하기</h1>
                <p>로그인하여 다양한 기능을 사용하세요.</p>
                <LoginForm/>
            </div>
        </>
    );
}