'use client';

import styles from './ConnectExistUser.module.css';
import { useState, useEffect } from 'react';
import { handleLogin, createHandleKeyDown } from '@/lib/login/client/loginHandler';

export default function ConnectExistUser() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || ''; 
    const [userId, setUsername] = useState('');
    const [userPw, setPassword] = useState('');

    return (
        <div className={styles.connectUserContainer}>
            <input type="text" placeholder="아이디" value={userId} onChange={(e) => setUsername(e.target.value)} autoComplete="off"/>
            <input type="password" placeholder="비밀번호" value={userPw} onChange={(e) => setPassword(e.target.value)} autoComplete="off"/>
            <button id="login-button">로그인</button>
        </div>
    )
}