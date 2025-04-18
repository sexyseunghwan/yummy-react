'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Decimal from 'decimal.js';
import { User, UserContextType } from '@/types/user';

const UserContext = createContext<UserContextType>({ user: null, isLoading: true });

export function UserProvider({ children }: { children: React.ReactNode }) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .post(
                `${apiBaseUrl}/login/auth/loginCheck`,
                {},
                {
                    withCredentials: true,
                }
            )
            .then(res => {
                const data = res.data;

                if (data.code === 'AUTH_ERROR') {
                    /* 로그인 안 된 경우 */ 
                    setUser(null);
                } else {
                    /* 로그인 된 유저 정보 */ 
                    const convertedUser: User = {
                        ...data,
                        lngX: data.lngX != null ? new Decimal(data.lngX) : 37.5045028775835,
                        latY: data.latY != null ? new Decimal(data.latY) : 127.048942471228,
                    };

                    setUser(convertedUser);
                }
            })
            .catch(err => {
                console.error('[LoginCheck] 예외 발생:', err);
                setUser(null); /* catch에서 fallback 처리 */ 
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
