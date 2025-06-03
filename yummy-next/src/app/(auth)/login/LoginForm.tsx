'use client';

import { useState, useEffect } from 'react';
import { loginWithKakao, loginWithNaver, loginWithTelegram, loginWithGoogle } from '@/lib/client/auth/login/loginWithOauth';
import Image from 'next/image';
import { handleLogin, createHandleKeyDown } from '@/lib/client/auth/login/loginHandler';
import Link from 'next/link'; 
import Script from 'next/script'; 
import { Button } from '@/components/common/Button/Button';
import styles from './Login.module.css';
import Input from '@/components/common/Input/Input';


export default function Login() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || ''; 
    const kakaoJsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '';
    const [userId, setUsername] = useState('');
    const [userPw, setPassword] = useState('');
    const [kakaoReady, setKakaoReady] = useState(false); // Kakao 준비 상태

    /* 기본적인 로그인 방식 */
    const onLogin = () => {
        handleLogin({ userId, userPw, apiBaseUrl });
    };
    
    /* 키보드 엔터를 치면 로그인 */
    const handleKeyDown = createHandleKeyDown(apiBaseUrl, userId, userPw);
        

    useEffect(() => {
        
        if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoJsKey);
            setKakaoReady(true); 
            console.log('Kakao SDK 초기화 완료');
        } else if (typeof window !== 'undefined' && window.Kakao && window.Kakao.isInitialized()) {
            setKakaoReady(true); 
        }

    }, []);

    return (
        <>
            <Script
                src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
                integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
                crossOrigin="anonymous"
                strategy="beforeInteractive"
                />
            <div className={styles.loginForm}>      
                <div className={styles.loginInputBox}>
                    <Input 
                        type="text"
                        placeholder="아이디"
                        value={userId}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        size="medium"
                        className={styles.loginInput}
                    />
                    <Input 
                        type="password"
                        placeholder="비밀번호"
                        value={userPw}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        size="medium"
                        className={styles.loginInput}
                    />
                    <Button 
                        onClick={onLogin} 
                        variant="primary" 
                        size="medium"
                        className={styles.loginButton}
                    >
                        로그인
                    </Button>
                </div>
                <div className={styles.loginLinkContainer}>
                    <Link href="/findPw" className={styles.loginLinkItem}>비밀번호 찾기</Link>
                    <Link href="/findId" className={styles.loginLinkItem}>아이디 찾기</Link>
                    <Link href="/joinMember" className={styles.loginLinkItem}>회원가입</Link>
                </div>

                <div className={styles.LoginSns}>
                    <a className={`${styles.LoginSnsItem} ${styles.LoginSnsItem_Kakao}`} id="oauth-kakao" onClick={loginWithKakao}>
                        <Image src="/images/oauth/kakao.svg" alt="KakaoTalk Logo" width={24} height={24}/>
                        카카오톡으로 로그인
                    </a>
                    <a className={`${styles.LoginSnsItem} ${styles.LoginSnsItem_Naver}`} id="oauth-naver" onClick={loginWithNaver}>
                        <Image src="/images/oauth/naver.png" alt="KakaoTalk Logo" width={24} height={24}/>
                        네이버로 로그인
                    </a>
                    <a className={`${styles.LoginSnsItem} ${styles.LoginSnsItem_Telegram}`} id="oauth-telegram" onClick={loginWithTelegram}>
                        <Image src="/images/oauth/telegram.png" alt="KakaoTalk Logo" width={24} height={24}/>
                        텔레그램으로 로그인
                    </a>
                    <a className={`${styles.LoginSnsItem} ${styles.LoginSnsItem_Google}`} id="oauth-google" onClick={loginWithGoogle}>
                        <Image src="/images/oauth/google.svg" alt="Google Logo" width={24} height={24} />
                        구글로 로그인
                    </a>
                </div>
            </div>
        </>
    );
}