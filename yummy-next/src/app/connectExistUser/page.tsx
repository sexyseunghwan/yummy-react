'use client';

import styles from './ConnectExistUser.module.css';
import { useState, useEffect } from 'react';
import { linkUserByOauth, createHandleKeyDown } from '@/lib/connectExistUser/client/linkUserByOauth';


export default function ConnectExistUser() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || ''; 
    const [userId, setUsername] = useState('');
    const [userPw, setPassword] = useState('');

    const onLogin = () => {
        linkUserByOauth({ userId, userPw, apiBaseUrl });
    };

    /* 키보드 엔터를 치면 로그인 */
    const handleKeyDown = createHandleKeyDown(apiBaseUrl, userId, userPw);

    return (
        <div className={styles.connectUserContainer}>
            <input type="text" placeholder="아이디" value={userId} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} autoComplete="off"/>
            <input type="password" placeholder="비밀번호" value={userPw} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} autoComplete="off"/>
            <button id="login-button" onClick={onLogin}>로그인</button>
        </div>
    )
}