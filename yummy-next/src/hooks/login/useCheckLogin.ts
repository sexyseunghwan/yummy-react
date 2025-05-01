// hooks/useCheckLogin.ts
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export function useCheckLogin(apiBaseUrl: string) {
    const router = useRouter();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await axios.post(
                    `${apiBaseUrl}/login/auth/loginCheck`,
                    {},
                    { withCredentials: true }
                );

                const data = res.data;

                if (data.code !== 'AUTH_ERROR') {
                    router.replace('/');
                }
            } catch (error) {
                console.error('로그인 상태 확인 실패', error);
            }
        };

        checkLogin();
    }, []);
}
