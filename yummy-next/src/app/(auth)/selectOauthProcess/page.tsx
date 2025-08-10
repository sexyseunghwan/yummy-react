'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { checkLogin } from '@/lib/client/auth/login/checkLogin';
import { removeTempJwt } from '@/lib/client/auth/logout/removeTempJwtHandler';

export default function Login() {
    const router = useRouter();
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';

    /* 로그인 여부 체크 후 리디렉션 */ 
    useEffect(() => {
        const check = async () => {
            const loginRes = await checkLogin(apiBaseUrl);
            if (loginRes === null) {
                router.push('/');
            }
        };

        check();
    }, [router]);
    
    return (
        <div className="auth-page-container">
            <div className="auth-container">
                <h1 className="auth-title">회원 선택</h1>
                <p className="auth-desc">가입 유형을 선택해 주세요.</p>
                <div className="auth-form">
                    <div className="auth-input-box">
                        <button
                            onClick={() => router.push('/joinMember')}
                            className="auth-button"
                        >
                            회원가입
                        </button>
                        <button
                            onClick={() => router.push('/connectExistUser')}
                            className="auth-button bg-gray-700 hover:bg-gray-300"
                        >
                            가존회원 연동
                        </button>
                        <button
                            onClick={() => removeTempJwt(apiBaseUrl)}
                            className="auth-button bg-gray-500 hover:bg-gray-300"
                        >
                            메인으로 돌아가기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}