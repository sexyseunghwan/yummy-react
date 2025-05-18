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
        <div className="bg-[#FFFAF0] p-5 rounded-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-center w-[350px] mt-[45px] text-black">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* 비밀번호 */}
                <input 
                    type="password" 
                    name="password" 
                    className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-md outline-none transition-colors focus:border-[#FFA500]" 
                    placeholder="비밀번호" 
                />
                
                {/* 비밀번호 확인 */}
                <input 
                    type="password" 
                    name="passwordCheck" 
                    className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-md outline-none transition-colors focus:border-[#FFA500]" 
                    placeholder="비밀번호 확인" 
                />
                
                <button 
                    type="submit" 
                    className="py-4 bg-[#ffcc00] text-black border-none rounded-md text-lg cursor-pointer transition-all hover:bg-[#FFA500] hover:scale-105"
                >
                    비밀번호 변경
                </button>
            </form>
        </div>
    )
}