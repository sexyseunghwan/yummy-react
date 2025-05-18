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
        <div className="bg-[#FFFAF0] p-5 rounded-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-center w-[350px] mt-[45px] text-black">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
                type="text" 
                name="userId" 
                placeholder="아이디" 
                className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-md outline-none transition-colors focus:border-[#facc15] focus:shadow-[0_0_0_1px_#facc15]"
            />
            <input 
                type="text" 
                name="userNm" 
                placeholder="이름" 
                className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-md outline-none transition-colors focus:border-[#facc15] focus:shadow-[0_0_0_1px_#facc15]"
            />
            {/* 통신사 선택 */}
            <select 
                className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-md outline-none transition-colors focus:border-[#facc15] focus:shadow-[0_0_0_1px_#facc15]" 
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
                className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-md outline-none transition-colors focus:border-[#facc15] focus:shadow-[0_0_0_1px_#facc15]"
            />
            
            {/* 이메일 (선택) */}
            <div className="flex items-center gap-2 w-full">
                <input 
                    type="text" 
                    name="emailId" 
                    className="flex-2 w-full px-3 py-2.5 text-base border border-gray-300 rounded-md outline-none transition-colors focus:border-[#facc15] focus:shadow-[0_0_0_1px_#facc15]" 
                    placeholder="이메일 아이디"
                />
                <span className="text-lg font-bold">@</span>
                <select 
                    name="emailDomain" 
                    className="flex-2 w-full px-3 py-2.5 text-base border border-gray-300 rounded-md outline-none transition-colors focus:border-[#facc15] focus:shadow-[0_0_0_1px_#facc15]"
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
                className="mt-4 bg-[#facc15] text-black font-semibold py-3 px-4 rounded-lg cursor-pointer transition-colors hover:bg-[#fbbf24]"
            >
              비밀번호 찾기
            </button>
          </form>
        </div>
      );
}