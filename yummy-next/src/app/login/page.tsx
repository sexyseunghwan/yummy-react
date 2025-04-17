import LoginForm from './LoginForm';
import { checkLoginAndRedirect } from '@/lib/login/server/checkLogin';

/* Server Component */
export default async function Login() {
    
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    
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