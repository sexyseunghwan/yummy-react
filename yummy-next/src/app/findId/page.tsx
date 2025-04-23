'use client';

import { useState } from 'react';
import styles from './FindId.module.css';
import { extractFormData, validateAndSubmit } from '@/lib/findId/client/findIdValidate';

export default function FindId() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';

    /* 아이디 찾기 함수 */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = extractFormData(form);
        await validateAndSubmit(formData, apiBaseUrl);
    };

    return (
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" name="userNm" placeholder="이름" className={styles.inputField}/>
            {/* 통신사 선택 */}
            <select className={styles.inputField} name="telecom">
                <option value="">통신사 선택</option>
                <option value="skt">SKT</option>
                <option value="kt">KT</option>
                <option value="lg">LG U+</option>
                <option value="etc">기타</option>
            </select>
            <input type="text" name="phoneNumber" placeholder="휴대전화번호 (- 제외)" className={styles.inputField}/>
            
            {/* 이메일 (선택) */}
            <div className={styles.emailContainer}>
                <input type="text" name="emailId" className={styles.emailInput} placeholder="이메일 아이디"/>
                <span className={styles.atMark}>@</span>
                <select name="emailDomain" className={styles.emailSelect}>
                    <option value="">직접입력</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="hanmail.net">hanmail.net</option>
                    <option value="nate.com">nate.com</option>
                </select>
            </div>

            <button type="submit" className={styles.submitButton}>
              아이디 찾기
            </button>
          </form>
        </div>
      );
}