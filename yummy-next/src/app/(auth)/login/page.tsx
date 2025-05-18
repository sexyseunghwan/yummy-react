export const dynamic = 'force-dynamic';

import LoginForm from './LoginForm';
import { checkLoginAndRedirect } from '@/lib/server/auth/login/checkLogin';
import Link from 'next/link';
import styles from './Login.module.css';
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
            <div className={styles.loginPage}>                
                {/* <div className={styles.loginHeader}>
                    <Link href="/" className={styles.backButton}>
                        뒤로가기
                    </Link>
                </div> */}
                <div className={styles.loginContainer} id="login-container">
                    <h1 className={styles.loginTitle}>로그인하기</h1>
                    <p className={styles.loginDesc}>로그인하여 다양한 기능을 사용하세요.</p>
                    <LoginForm/>
                </div>
            </div>
        </>
    );
}