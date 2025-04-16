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
                <Image src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="KakaoTalk Logo" />
                카카오톡으로 로그인
            </a>
            <a className="oauth-login" id="oauth-naver" onClick={loginWithNaver}>
                <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAASFBMVEVHcEwD0mcE62cE6GcE7mcE7GcF7GcE4mdd4pE82H4C2mX////g9+rR9OCd57sC0mYCymVd0Y8Cw2UixnACvWYCuWYCt2YCuGa1Zq98AAAAGHRSTlMAS7X//73A//////////////////+1/78LKXJJAAAA0UlEQVR4AXWJhRHAQBACibtb/52GP+KyLzAsiOcH4YPA92BETyNikDj4IgyCCPDU9O9FePCDncTuBR/JlUCxI/nkKdM0zSzJIfPETlqQjKVkptuIXJgsWSqT4iJJ/ZBNbkeyyBpJrWj4k02Wkg3hDIakqCUFFK2TVV2Ibpdt407TOdmWkqnGFq2QzCQ7bQ/Z1/+yb/vyJnvhZMkcTPZil0PXddnIkrEMD9mPREF2ySr6oxwV0/jLBG9Wm3n0H9UDltkYFZe+ALIP5AxveqvJo1gBuZAlPbYzv2wAAAAASUVORK5CYII=" alt="KakaoTalk Logo"/>
                네이버로 로그인
            </a>
            <a className="oauth-login" id="oauth-telegram" onClick={loginWithTelegram}>
                <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAY1BMVEX////8/f+41Pd7sfFFmO0gius9le1zrfCuzvby9/2QvPMTh+srjewzkOwykOwMhuvV5frB2figxvW20vfq8v1np/A4kuzv9f3i7fxtqvDO4fmWwPRQne7L3/kAguqGt/Ld6/s4puGjAAAA/0lEQVR4AayRhQ5DMQhFeVKFls5d/v8rt9I1YRLfjcLBgT9oGKfZGOt8+EYRDaWcExmePnAhk1MX4ajZgpNW5qXKY0lT4lVnA1X7I3cNTdEkJYNY+25eiahn2S53u0p5L3DsiZn4cAQAgXQSOFFjxpx2AAGgmBp5FjhnqWd9beGOvRQKrOvjptaDCxcAOJHA8IJmbA2uMoVT0D4b5Ntlt8i0g+YQCD0wk0GDd7EHFmjF8H0V2kilO4oRBQZOndbefdgCatGqjIcBbtWkMzQFfT9qs3L59c4sDNVDlx8PxQmURlY/Ja55SusNU24Iz3f41P4041M2FvitEB4jPp0DAHyFFi4xND68AAAAAElFTkSuQmCC" alt="KakaoTalk Logo"/>
                텔레그램으로 로그인
            </a>
            <a className="oauth-login" id="oauth-google" onClick={loginWithGoogle}>
                <Image src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google Logo" style={{ width: '70px' }} />
                구글로 로그인
            </a>
        </>
    );
}