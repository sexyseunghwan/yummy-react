'use client';

import { useKakaoLogin } from '@/hooks/login/useKakaoLogin';
import { useState, useEffect } from 'react';

export default function LoggingPage() {
	const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || ''; 
	const apiResult = useKakaoLogin(apiBaseUrl);
	const [dots, setDots] = useState('');

	useEffect(() => {
		let count = 0;
		const iv = setInterval(() => {
			count = (count + 1) % 4;
			setDots('.'.repeat(count));
		}, 500);

		return () => clearInterval(iv);
	}, []);


    useEffect(() => {
		if (apiResult === null) return; /* 아직 응답 안 왔으면 무시 */ 

        /* 3초 뒤 이동 */ 
        const timeout  = setTimeout(() => {

            if (apiResult === "SUCCESS") {
				alert('카카오 로그인 성공');
				window.location.href = '/';
            } else if (apiResult === "JOIN_TARGET_MEMBER") {
				window.location.href = '/joinMember';
			} else {
              	alert('카카오 로그인 실패');
				  window.location.href = '/';
			}

        }, 1500);
		
        return () => clearTimeout(timeout);
        
    }, [apiResult]);

  return (
    <div className="bg-[#FFFAF0] p-5 rounded-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-center w-[350px] mt-[45px] text-black">
      로그인 중입니다{dots}
    </div>
  );
}