'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { checkLogin } from '@/lib/client/auth/login/checkLogin';

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
                        <Link
                            href="/joinMember"
                            className="auth-button"
                        >
                            회원가입
                        </Link>
                        <Link
                            href="/connectExistUser"
                            className="auth-button bg-gray-200 hover:bg-gray-300"
                        >
                            기존회원 연동
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
