'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { OauthLoginParams } from '@/types/client/auth/login/oauthLoginParams';

export function useGoogleLogin(apiBaseUrl: string) {

    const [result, setResult] = useState<string | null>(null);

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        const loginCode = urlParams.get('code');

        if (!loginCode) {
            return;
        }

        const loginParams: OauthLoginParams = {
            oauthType: 'google',  
            code: loginCode     
        };

        const checkLogin = async () => {
            try {
                const res = await axios.post(`${apiBaseUrl}/login/oauth2/google`, loginParams, { withCredentials: true });
                setResult(res.data);
            } catch(e) {
                console.error(e);
                setResult("SERVER_ERR");
            }
        }

        checkLogin();


    }, []);

    return result;

}