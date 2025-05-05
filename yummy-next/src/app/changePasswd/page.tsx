'use client';

import styles from './ChangePasswd.module.css';

export default function ChangePasswd() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // const form = e.currentTarget;
            // const formData = extractFormData(form, gender);
            // await validateAndSubmit(formData, apiBaseUrl);
        };
    
    return (
        <div className={styles.changePwContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* 비밀번호 */}
                <input type="password" name="password" className={styles.inputField} placeholder="비밀번호" />
                
                {/* 비밀번호 확인 */}
                <input type="password" name="passwordCheck" className={styles.inputField} placeholder="비밀번호 확인" />
                
                <button type="submit" className={styles.submitButton}>비밀번호 변경</button>
            </form>
        </div>
    )

}