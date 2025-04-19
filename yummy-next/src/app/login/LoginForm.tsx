'use client';

import { useState } from 'react';
import { loginWithKakao, loginWithNaver, loginWithTelegram, loginWithGoogle } from '@/lib/login/client/loginWithOauth';
import Image from 'next/image';
import { handleLogin, createHandleKeyDown } from '@/lib/login/client/loginHandler';
import Link from 'next/link'; 
import styles from './Login.module.css'; 

export default function Login() {

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || ''; 
    const [userId, setUsername] = useState('');
    const [userPw, setPassword] = useState('');

    /* 기본적인 로그인 방식 */
    const onLogin = () => {
        handleLogin({ userId, userPw, apiBaseUrl });
    };
    
    /* 키보드 엔터를 치면 로그인 */
    const handleKeyDown = createHandleKeyDown(apiBaseUrl, userId, userPw);
    
    return (
        <>
            <input type="text" placeholder="아이디" value={userId} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} autoComplete="off"/>
            <input type="password" placeholder="비밀번호" value={userPw} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} autoComplete="off"/>
            <button id="login-button" onClick={onLogin}>로그인</button>
            
            <div className={styles.linkContainer}>
                <Link href="#" className={styles.link}>비밀번호 찾기</Link>
                <span className={styles.divider}>|</span>
                <Link href="#" className={styles.link}>아이디 찾기</Link>
                <span className={styles.divider}>|</span>
                <Link href="/joinMember" className={styles.link}>회원가입</Link>
            </div>

            <a className="oauth-login" id="oauth-kakao" onClick={loginWithKakao}>
                <Image src="/images/oauth/kakao.svg" alt="KakaoTalk Logo" width={24} height={24}/>
                카카오톡으로 로그인
            </a>
            <a className="oauth-login" id="oauth-naver" onClick={loginWithNaver}>
                <Image src="/images/oauth/naver.png" alt="KakaoTalk Logo" width={24} height={24}/>
                네이버로 로그인
            </a>
            <a className="oauth-login" id="oauth-telegram" onClick={loginWithTelegram}>
                <Image src="/images/oauth/telegram.png" alt="KakaoTalk Logo" width={24} height={24}/>
                텔레그램으로 로그인
            </a>
            <a className="oauth-login" id="oauth-google" onClick={loginWithGoogle}>
                <Image src="/images/oauth/google.svg" alt="Google Logo" width={24} height={24} />
                구글로 로그인
            </a>
        </>
    );
}