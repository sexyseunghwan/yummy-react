'use client';

import { useGoogleLogin } from '@/hooks/login/useGoogleLogin';
import { useState, useEffect } from 'react';

export default function GoogleLoginPage() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || ''; 
    const [dots, setDots] = useState('');
    const apiResult = useGoogleLogin(apiBaseUrl);

    useEffect(() => {
            let count = 0;
            const iv = setInterval(() => {
                count = (count + 1) % 4;
                setDots('.'.repeat(count));
            }, 300);
            
            return () => clearInterval(iv);
        }, []);
    
    useEffect(() => {
        if (apiResult === null) return; /* 아직 응답 안 왔으면 무시 */ 

        const timeout = setTimeout(() => {

            if (apiResult === "SUCCESS") {
                alert('구글 로그인 성공');
                window.location.href = '/';
            } else if (apiResult === "JOIN_TARGET_MEMBER") {
                alert('해당 구글 아이디를 기존 회원연동 또는 회원가입이 필요합니다.')
				window.location.href = '/selectOauthProcess';
            } else {
                alert('구글 로그인 실패');
                window.location.href = '/';
            }

        }, 100);

        return () => clearTimeout(timeout);

    }, [apiResult]);

    return (
    <div className="bg-[#FFFAF0] p-5 rounded-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-center w-[350px] mt-[45px] text-black">
        로그인 중입니다{dots}
    </div>
  );
}