'use client';

import styles from './JoinMember.module.css'; 
import { validateAndSubmit, extractFormData } from '@/lib/joinMember/client/joinMemberValidate';
import { useState } from 'react';

/* 회원가입 페이지 */
export default function JoinMember() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const [gender, setGender] = useState('');

    /* 회원가입 함수 */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = extractFormData(form, gender);
        await validateAndSubmit(formData, apiBaseUrl);
    };
    
    
    return (
        <div className={styles.joinMemberContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* 아이디 */}
                <input type="text" name="userId" className={styles.inputField} placeholder="아이디" />

                {/* 비밀번호 */}
                <input type="password" name="password" className={styles.inputField} placeholder="비밀번호" />

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
                
                {/* 이름 */}
                <input type="text" name="name" className={styles.inputField} placeholder="이름" />

                {/* 생년월일 */}
                <input type="text" name="birthDate" className={styles.inputField} placeholder="생년월일 8자리" />

                {/* 통신사 선택 */}
                <select className={styles.inputField} name="telecom">
                    <option value="">통신사 선택</option>
                    <option value="skt">SKT</option>
                    <option value="kt">KT</option>
                    <option value="lg">LG U+</option>
                    <option value="etc">기타</option>
                </select>

                {/* 성별/내외국인 */}
                <div className={styles.selectGroup}>
                    <button
                        type="button"
                        className={`${styles.selectButton} ${gender === 'm' ? styles.activeButton : ''}`}
                        onClick={() => setGender('m')}
                    >
                        남자
                    </button>
                    <button
                        type="button"
                        className={`${styles.selectButton} ${gender === 'f' ? styles.activeButton : ''}`}
                        onClick={() => setGender('f')}
                    >
                        여자
                    </button>
                    <button
                        type="button"
                        className={`${styles.selectButton} ${gender === 'i' ? styles.activeButton : ''}`}
                        onClick={() => setGender('i')}
                    >
                        내국인
                    </button>
                    <button
                        type="button"
                        className={`${styles.selectButton} ${gender === 'o' ? styles.activeButton : ''}`}
                        onClick={() => setGender('o')}
                    >
                        외국인
                    </button>
                </div>

                {/* 휴대전화번호 */}
                <input type="text" name="phoneNumber" className={styles.inputField} placeholder="휴대전화번호 (- 제외)" />
                
                {/* 가입 버튼 */}
                <button type="submit" className={styles.submitButton}>가입하기</button>
            </form>
        </div>
    )
}
