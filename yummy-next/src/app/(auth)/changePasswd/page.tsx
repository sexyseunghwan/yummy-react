'use client';

import { extractFormData, validateAndSubmit } from '@/lib/changePasswd/client/changePasswdValidate';

export default function ChangePasswd() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = extractFormData(form);
        await validateAndSubmit(formData, apiBaseUrl);
    };
    
    return (
        <div className="auth-page-container">
            <div className="auth-container">
                <h1 className="auth-title">비밀번호 변경</h1>
                <p className="auth-desc">새로운 비밀번호를 입력해주세요.</p>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-input-box">
                        {/* 비밀번호 */}
                        <input 
                            type="password" 
                            name="password" 
                            className="auth-input" 
                            placeholder="비밀번호" 
                        />
                        
                        {/* 비밀번호 확인 */}
                        <input 
                            type="password" 
                            name="passwordCheck" 
                            className="auth-input" 
                            placeholder="비밀번호 확인" 
                        />
                        
                        <button 
                            type="submit" 
                            className="auth-button"
                        >
                            비밀번호 변경
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}