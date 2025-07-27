'use client';

import { linkUserByOauth, createHandleKeyDown } from '@/lib/client/auth/connectExistUser/linkUserByOauth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { checkLogin } from '@/lib/client/auth/login/checkLogin';

export default function ConnectExistUser() {
    const router = useRouter();
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || ''; 
    const [userId, setUsername] = useState('');
    const [userPw, setPassword] = useState('');

    /* 로그인 여부 체크 후 리디렉션 */ 
    useEffect(() => {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';

        const check = async () => {
            const loginRes = await checkLogin(apiBaseUrl);
            if (loginRes === null) {
                router.push('/');
            }
        };

        check();
    }, [router]);
    
    const onLogin = () => {
        linkUserByOauth({ userId, userPw, apiBaseUrl });
    };

    /* 키보드 엔터를 치면 로그인 */
    const handleKeyDown = createHandleKeyDown(apiBaseUrl, userId, userPw);

    return (
        <div className="auth-page-container">
            <div className="auth-container">
                <h1 className="auth-title">기존 계정 연동</h1>
                <p className="auth-desc">계정을 연동하려면<br />기존 아이디와 비밀번호로 로그인해 주세요.</p>
                <form className="auth-form">
                    <div className="auth-input-box">
                        <input 
                            type="text" 
                            placeholder="아이디" 
                            value={userId} 
                            onChange={(e) => setUsername(e.target.value)} 
                            onKeyDown={handleKeyDown} 
                            autoComplete="off"
                            className="auth-input"
                        />
                        <input 
                            type="password" 
                            placeholder="비밀번호" 
                            value={userPw} 
                            onChange={(e) => setPassword(e.target.value)} 
                            onKeyDown={handleKeyDown} 
                            autoComplete="off"
                            className="auth-input"
                        />
                        <button 
                            id="login-button"
                            type="button" 
                            onClick={onLogin}
                            className="auth-button"
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}