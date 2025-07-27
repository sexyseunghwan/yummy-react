'use client';

import { useState, useEffect } from 'react';
import { loginWithKakao, loginWithNaver, loginWithTelegram, loginWithGoogle } from '@/lib/client/auth/login/loginWithOauth';
import Image from 'next/image';
import { handleLogin, createHandleKeyDown } from '@/lib/client/auth/login/loginHandler';
import Link from 'next/link'; 
import Script from 'next/script'; 
import { Button } from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';

export default function Login() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || ''; 
    const kakaoJsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '';
    const [userId, setUsername] = useState('');
    const [userPw, setPassword] = useState('');
    const [kakaoReady, setKakaoReady] = useState(false);

    const onLogin = () => {
        handleLogin({ userId, userPw, apiBaseUrl });
    };
    
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
            <div className="auth-form">      
                <div className="auth-input-box">
                    <Input 
                        type="text"
                        placeholder="아이디"
                        value={userId}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        size="medium"
                        className="auth-input"
                    />
                    <Input 
                        type="password"
                        placeholder="비밀번호"
                        value={userPw}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        size="medium"
                        className="auth-input"
                    />
                    <Button 
                        onClick={onLogin} 
                        variant="primary" 
                        size="medium"
                        className="auth-button"
                    >
                        로그인
                    </Button>
                </div>
                <div className="auth-link-container">
                    <Link href="/findPw" className="auth-link-item">비밀번호 찾기</Link>
                    <Link href="/findId" className="auth-link-item">아이디 찾기</Link>
                    <Link href="/joinMember" className="auth-link-item">회원가입</Link>
                </div>
                
                <div className="auth-sns-container">
                    <a className="auth-sns-button auth-sns-button_kakao" id="oauth-kakao" onClick={loginWithKakao}>
                        <Image src="/images/oauth/kakao.svg" alt="KakaoTalk Logo" width={24} height={24}/>
                        카카오톡으로 로그인
                    </a>
                    <a className="auth-sns-button auth-sns-button_naver" id="oauth-naver" onClick={loginWithNaver}>
                        <Image src="/images/oauth/naver.png" alt="Naver Logo" width={24} height={24}/>
                        네이버로 로그인
                    </a>
                    <a className="auth-sns-button auth-sns-button_telegram" id="oauth-telegram" onClick={loginWithTelegram}>
                        <Image src="/images/oauth/telegram.png" alt="Telegram Logo" width={24} height={24}/>
                        텔레그램으로 로그인
                    </a>
                    <a className="auth-sns-button auth-sns-button_google" id="oauth-google" onClick={loginWithGoogle}>
                        <Image src="/images/oauth/google.svg" alt="Google Logo" width={24} height={24} />
                        구글로 로그인
                    </a>
                </div>
            </div>
        </>
    );
}