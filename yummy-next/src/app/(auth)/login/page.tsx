export const dynamic = 'force-dynamic';

import LoginForm from './LoginForm';
import { checkLoginAndRedirect } from '@/lib/server/auth/login/checkLogin';
import Link from 'next/link';

/* Server Component */
export default async function Login() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    
    /* 로그인이 되었는지 판단. */
    await checkLoginAndRedirect(apiBaseUrl);
    
    return (
        <>
            <div className="auth-page-container">                
                <div className="auth-container" id="login-container">
                    <h1 className="auth-title">로그인하기</h1>
                    <p className="auth-desc">로그인하여 다양한 기능을 사용하세요.</p>
                    <LoginForm/>
                </div>
            </div>
        </>
    );
}