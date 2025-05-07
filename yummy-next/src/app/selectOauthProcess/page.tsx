'use client';

import styles from './SelectOauthProcess.module.css';
import Link from 'next/link'; 

export default function SelectOauthProcess() {
    return (
        <div className={styles.selectOauthContainer} id="login-container">
            <Link href="/joinMember" className={styles.selectContainer}>
                회원가입
            </Link>
            <Link href="/connectExistUser" className={styles.selectContainer}>
                기존회원 연동
            </Link>
        </div>
    )
}