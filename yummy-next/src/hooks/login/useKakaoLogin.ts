// ✅ hooks/useKakaoLogin.ts
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export function useKakaoLogin(apiBaseUrl: string) {
    const searchParams = useSearchParams();
    const [success, setSuccess] = useState<string | null>(null);
    
    useEffect(() => {
        const code = searchParams.get('code');
        
        if (!code) return;
        
        const checkLogin = async () => {
            try {
                const res = await axios.post(`${apiBaseUrl}/login/oauth2/kakao`, { code }, { withCredentials: true });
                setSuccess(res.data);
            } catch (e) {
                console.error(e);
                setSuccess("SERVER_ERR");
            }
        };
        
        checkLogin();
        
    }, []);
    
    return success;
}