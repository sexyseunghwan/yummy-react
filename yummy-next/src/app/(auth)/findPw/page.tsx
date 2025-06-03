'use client';

import { extractFormData, validateAndSubmit } from '@/lib/client/auth/findPw/findPwValidate';

export default function FindPw() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';

    /* 비밀번호 찾기 함수 */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = extractFormData(form);
        await validateAndSubmit(formData, apiBaseUrl);
    };

    return (
        <div className="auth-page-container">
            <div className="auth-container">
                <h1 className="auth-title">비밀번호 찾기</h1>
                <p className="auth-desc">회원정보에 등록한 정보를 입력해주세요.</p>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-input-box">
                        <input 
                            type="text" 
                            name="userId" 
                            placeholder="아이디" 
                            className="auth-input"
                        />
                        <input 
                            type="text" 
                            name="userNm" 
                            placeholder="이름" 
                            className="auth-input"
                        />
                        {/* 통신사 선택 */}
                        <select 
                            className="auth-input" 
                            name="telecom"
                        >
                            <option value="">통신사 선택</option>
                            <option value="skt">SKT</option>
                            <option value="kt">KT</option>
                            <option value="lg">LG U+</option>
                            <option value="etc">기타</option>
                        </select>
                        <input 
                            type="text" 
                            name="phoneNumber" 
                            placeholder="휴대전화번호 (- 제외)" 
                            className="auth-input"
                        />
                        
                        {/* 이메일 (선택) */}
                        <div className="flex items-center gap-2 w-full">
                            <input 
                                type="text" 
                                name="emailId" 
                                className="auth-input flex-2" 
                                placeholder="이메일 아이디"
                            />
                            <span className="text-lg font-bold">@</span>
                            <select 
                                name="emailDomain" 
                                className="auth-input flex-2"
                            >
                                <option value="">직접입력</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="naver.com">naver.com</option>
                                <option value="daum.net">daum.net</option>
                                <option value="hanmail.net">hanmail.net</option>
                                <option value="nate.com">nate.com</option>
                            </select>
                        </div>

                        <button 
                            type="submit" 
                            className="auth-button"
                        >
                            비밀번호 찾기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}