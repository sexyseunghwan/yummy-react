'use client';

import styles from './LoggingPage.module.css';
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
				alert('해당 카카오 아이디를 기존 회원연동 또는 회원가입이 필요합니다.')
				window.location.href = '/selectOauthProcess';
			} else {
              	alert('카카오 로그인 실패');
				  window.location.href = '/';
			}

        }, 1500);
		
        return () => clearTimeout(timeout);
        
    }, [apiResult]);

  return (
    <div className={styles.logingContainer}>
      로그인 중입니다{dots}
    </div>
  );
}