'use client';

import { useState } from 'react';
import { loginWithKakao, loginWithNaver, loginWithTelegram, loginWithGoogle } from '@/lib/login/loginWithOauth';
import axios from 'axios';
import Image from 'next/image';


export default function Login() {

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const [userId, setUsername] = useState('');
    const [userPw, setPassword] = useState('');

    const handleLogin = async () => {

        const payload = { userId, userPw };
        
        try {   
            
            const response = await axios.post(`${apiBaseUrl}/login/standardLogin`,
                                payload,
                                {
                                    headers: { 'Content-Type': 'application/json' },
                                    withCredentials: true,
                                }
                            );

            if (response.status === 200) {
                window.location.href = '/';
            } else {
                alert('로그인에 실패하였습니다. 아이디/비밀번호를 확인해주세요.');
            }

        } catch(err) {
            console.error("로그인 중 에러 발생:", err);
        }
    }

    return (
        <>
            <input type="text" placeholder="아이디" value={userId} onChange={(e) => setUsername(e.target.value)} autoComplete="off"/>
            <input type="password" placeholder="비밀번호" value={userPw} onChange={(e) => setPassword(e.target.value)} autoComplete="off"/>
            <button id="login-button" onClick={handleLogin}>로그인</button>

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