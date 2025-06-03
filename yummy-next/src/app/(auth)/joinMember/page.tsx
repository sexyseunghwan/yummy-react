'use client';

import { validateAndSubmit, extractFormData } from '@/lib/client/auth/joinMember/joinMemberValidate';
import { useState } from 'react';
import { Button } from '@/components/common/Button/Button';

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
        <div className="auth-page-container">
            <div className="auth-container">
                <h1 className="auth-title">회원가입</h1>
                <p className="auth-desc">회원가입하여 다양한 기능을 사용하세요.</p>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-input-box"> 
                        {/* 아이디 */}
                        <input 
                            type="text" 
                            name="userId" 
                            className="auth-input" 
                            placeholder="아이디" 
                        />

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
                        
                        {/* 이름 */}
                        <input 
                            type="text" 
                            name="name" 
                            className="auth-input" 
                            placeholder="이름" 
                        />

                        {/* 생년월일 */}
                        <input 
                            type="text" 
                            name="birthDate" 
                            className="auth-input" 
                            placeholder="생년월일 8자리" 
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

                        {/* 성별/내외국인 */}
                        <div className="flex gap-2 flex-wrap">
                            <button
                                type="button"
                                className={`flex-1 py-2.5 text-sm border border-gray-300 rounded-md bg-gray-50 cursor-pointer transition-all hover:bg-[#FFA500] hover:border-[#FFA500] ${gender === 'm' ? 'bg-[#FFA500] border-[#FFA500] text-white font-bold' : ''}`}
                                onClick={() => setGender('m')}
                            >
                                남자
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2.5 text-sm border border-gray-300 rounded-md bg-gray-50 cursor-pointer transition-all hover:bg-[#FFA500] hover:border-[#FFA500] ${gender === 'f' ? 'bg-[#FFA500] border-[#FFA500] text-white font-bold' : ''}`}
                                onClick={() => setGender('f')}
                            >
                                여자
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2.5 text-sm border border-gray-300 rounded-md bg-gray-50 cursor-pointer transition-all hover:bg-[#FFA500] hover:border-[#FFA500] ${gender === 'i' ? 'bg-[#FFA500] border-[#FFA500] text-white font-bold' : ''}`}
                                onClick={() => setGender('i')}
                            >
                                내국인
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2.5 text-sm border border-gray-300 rounded-md bg-gray-50 cursor-pointer transition-all hover:bg-[#FFA500] hover:border-[#FFA500] ${gender === 'o' ? 'bg-[#FFA500] border-[#FFA500] text-white font-bold' : ''}`}
                                onClick={() => setGender('o')}
                            >
                                외국인
                            </button>
                        </div>

                        {/* 휴대전화번호 */}
                        <input 
                            type="text" 
                            name="phoneNumber" 
                            className="auth-input" 
                            placeholder="휴대전화번호 (- 제외)" 
                        />
                        
                        {/* 가입 버튼 */}
                        <Button type="submit" className="auth-button">가입하기</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
