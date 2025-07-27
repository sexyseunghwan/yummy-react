// ✅ hooks/useKakaoLogin.ts
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { OauthLoginParams } from '@/types/client/auth/login/oauthLoginParams';
import axios from 'axios';

export function useKakaoLogin(apiBaseUrl: string) {
    const searchParams = useSearchParams();
    const [success, setSuccess] = useState<string | null>(null);
    
    useEffect(() => {
        const loginCode = searchParams.get('code');
        
        if (!loginCode) return;

        const loginParams: OauthLoginParams = {
            oauthType: 'kakao',  
            code: loginCode     
        };
        
        const checkLogin = async () => {
            try {
                const res = await axios.post(`${apiBaseUrl}/login/oauth2/kakao`, loginParams, { withCredentials: true });
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