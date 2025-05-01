// components/LoggingInPage.tsx
'use client';

import styles from './LoggingPage.module.css';
import { useKakaoLogin } from '@/hooks/login/useKakaoLogin';
import { useState, useEffect } from 'react';


export default function LoggingInPage() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || ''; 
    //const success = useKakaoLogin(apiBaseUrl);
    const [dots, setDots] = useState('');

    useEffect(() => {
        let count = 0;
        const iv = setInterval(() => {
            count = (count + 1) % 4;
            setDots('.'.repeat(count));
        }, 500);

        // 3초 뒤 이동
        const to = setTimeout(() => {
            clearInterval(iv);
            // 만약 로그인 성공 시에만 이동하고 싶다면 아래처럼 분기해도 됩니다.
            // if (success) {
            window.location.href = '/';
            // }
        }, 3000);

        return () => {
            clearInterval(iv);
            clearTimeout(to);
        };
    }, []);

  return (
    <div className={styles.logingContainer}>
      로그인 중입니다{dots}
    </div>
  );
}
