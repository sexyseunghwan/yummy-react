'use client';

import { linkUserByOauth, createHandleKeyDown } from '@/lib/client/auth/connectExistUser/linkUserByOauth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { checkLogin } from '@/lib/client/auth/login/checkLogin';


export default function ConnectExistUser() {
    const router = useRouter();
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || ''; 
    const [userId, setUsername] = useState('');
    const [userPw, setPassword] = useState('');

    /* 로그인 여부 체크 후 리디렉션 */ 
    useEffect(() => {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';

        const check = async () => {
            const loginRes = await checkLogin(apiBaseUrl);
            if (loginRes === null) {
                router.push('/');
            }
        };

        check();
    }, [router]);
    

    const onLogin = () => {
        linkUserByOauth({ userId, userPw, apiBaseUrl });
    };

    /* 키보드 엔터를 치면 로그인 */
    const handleKeyDown = createHandleKeyDown(apiBaseUrl, userId, userPw);

    return (
        <div className="bg-[#FFFAF0] p-5 rounded-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-center w-[350px] mt-[45px] text-black">
            
            {/* 설명 문구 추가 부분 */}
            <div className="mb-4">
                <p className="text-xl font-semibold mb-1">기존 계정 연동</p>
                <p className="text-sm text-gray-600">계정을 연동하려면 <br /> 
                    기존 아이디와 비밀번호로 로그인해 주세요.</p>
            </div>
            
            <input 
                type="text" 
                placeholder="아이디" 
                value={userId} 
                onChange={(e) => setUsername(e.target.value)} 
                onKeyDown={handleKeyDown} 
                autoComplete="off"
                className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-md outline-none transition-colors focus:border-[#FFA500] mb-3"
            />
            <input 
                type="password" 
                placeholder="비밀번호" 
                value={userPw} 
                onChange={(e) => setPassword(e.target.value)} 
                onKeyDown={handleKeyDown} 
                autoComplete="off"
                className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-md outline-none transition-colors focus:border-[#FFA500] mb-3"
            />
            <button 
                id="login-button" 
                onClick={onLogin}
                className="w-full py-4 bg-[#ffcc00] text-black border-none rounded-md text-lg cursor-pointer transition-all hover:bg-[#FFA500] hover:scale-105 mb-4"
            >
                로그인
            </button>
        </div>
    )
}