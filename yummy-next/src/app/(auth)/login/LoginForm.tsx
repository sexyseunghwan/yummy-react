'use client';

import { useState, useEffect } from 'react';
import { loginWithKakao, loginWithNaver, loginWithTelegram, loginWithGoogle } from '@/lib/client/auth/login/loginWithOauth';
import Image from 'next/image';
import { handleLogin, createHandleKeyDown } from '@/lib/client/auth/login/loginHandler';
import Link from 'next/link'; 
import Script from 'next/script'; 
import axios from 'axios';

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
            
            <div className="text-sm text-center my-4">
                <Link href="/findPw" className="text-gray-600 no-underline px-2 transition-colors hover:text-[#0070f3] hover:underline">비밀번호 찾기</Link>
                <span className="text-gray-400 mx-1">|</span>
                <Link href="/findId" className="text-gray-600 no-underline px-2 transition-colors hover:text-[#0070f3] hover:underline">아이디 찾기</Link>
                <span className="text-gray-400 mx-1">|</span>
                <Link href="/joinMember" className="text-gray-600 no-underline px-2 transition-colors hover:text-[#0070f3] hover:underline">회원가입</Link>
            </div>

            <a 
                className="flex items-center justify-center gap-2 w-full py-3 px-4 mb-3 bg-[#FEE500] text-black rounded-md cursor-pointer transition-all hover:bg-[#FDD835]"
                id="oauth-kakao" 
                onClick={loginWithKakao}
            >
                <Image src="/images/oauth/kakao.svg" alt="KakaoTalk Logo" width={24} height={24}/>
                카카오톡으로 로그인
            </a>
            <a 
                className="flex items-center justify-center gap-2 w-full py-3 px-4 mb-3 bg-[#03C75A] text-white rounded-md cursor-pointer transition-all hover:bg-[#02B350]"
                id="oauth-naver" 
                onClick={loginWithNaver}
            >
                <Image src="/images/oauth/naver.png" alt="Naver Logo" width={24} height={24}/>
                네이버로 로그인
            </a>
            <a 
                className="flex items-center justify-center gap-2 w-full py-3 px-4 mb-3 bg-[#0088cc] text-white rounded-md cursor-pointer transition-all hover:bg-[#0077b3]"
                id="oauth-telegram" 
                onClick={loginWithTelegram}
            >
                <Image src="/images/oauth/telegram.png" alt="Telegram Logo" width={24} height={24}/>
                텔레그램으로 로그인
            </a>
            <a 
                className="flex items-center justify-center gap-2 w-full py-3 px-4 mb-3 bg-white text-black border border-gray-300 rounded-md cursor-pointer transition-all hover:bg-gray-50"
                id="oauth-google" 
                onClick={loginWithGoogle}
            >
                <Image src="/images/oauth/google.svg" alt="Google Logo" width={24} height={24} />
                구글로 로그인
            </a>
        </>
    );
}