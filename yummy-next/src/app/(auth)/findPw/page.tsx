'use client';


import styles from './FindPw.module.css';

export default function FindPw() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';

     /* 비밀번호 찾기 함수 */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const form = e.currentTarget;
        // const formData = extractFormData(form);
        // await validateAndSubmit(formData, apiBaseUrl);
    };
    
    return (
        <div className={styles.container}>
             <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" name="userNm" placeholder="이름" className={styles.inputField}/>
                <input type="text" name="userId" placeholder="아이디" className={styles.inputField}/>
                
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
                    비밀번호 찾기
                </button>
             </form>
        </div>
    );
}