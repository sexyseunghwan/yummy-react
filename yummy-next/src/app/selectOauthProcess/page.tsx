'use client';

import styles from './SelectOauthProcess.module.css';
import Link from 'next/link'; 

export default function SelectOauthProcess() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || ''; 
    
    return (
        <div>
            <Link href="/joinMember" className={styles.link}>회원가입</Link>
            <Link href="/joinMember" className={styles.link}>기존회원 연동</Link>
        </div>
    )
}