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
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF8EC] text-black">
            <div className="bg-[#FFFAF0] p-6 rounded-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-center w-[350px]">
                <h1 className="text-2xl font-bold mb-2">회원 선택</h1>
                <p className="text-gray-600 mb-4">가입 유형을 선택해 주세요.</p>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/joinMember"
                        className="block w-full py-3 bg-[#FFD700] text-black rounded-md text-lg font-semibold transition-all hover:bg-[#FFA500] hover:scale-105"
                    >
                        회원가입
                    </Link>
                    <Link
                        href="/connectExistUser"
                        className="block w-full py-3 bg-[#EEE] text-black rounded-md text-lg font-semibold transition-all hover:bg-gray-300 hover:scale-105"
                    >
                        기존회원 연동
                    </Link>
                </div>
            </div>
        </div>
    );
}
