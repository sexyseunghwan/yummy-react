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
            <div className="bg-[#FFFAF0] p-5 rounded-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-center w-[350px] mt-[45px] text-black">
                <h1 className="text-2xl font-bold mb-2">로그인하기</h1>
                <p className="text-gray-600 mb-4">로그인하여 다양한 기능을 사용하세요.</p>
                <LoginForm/>
            </div>
        </>
    );
}