// ✅ hooks/useKakaoLogin.ts
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export function useKakaoLogin(apiBaseUrl: string) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    useEffect(() => {
        if (!code) return;

        const checkLogin = async () => {
            try {
                const res = await axios.post(`${apiBaseUrl}/login/ouath2/kakao`, { code }, { withCredentials: true });
                if (res.data === 'SUCCESS') router.replace('/');
            } catch (e) {
                console.error(e);
            }
        };

        checkLogin();
    }, [code]);
}
