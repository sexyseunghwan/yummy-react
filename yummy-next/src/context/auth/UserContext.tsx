'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Decimal from 'decimal.js';
import { User, UserContextType } from '@/types/shared/user';

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
                
                const response = res.data;
                const status = response.publicStatus;
                const userData = response.data;

                if (status === 'SUCCESS' && userData) {

                    /* 로그인 된 유저 정보 */ 
                    const convertedUser: User = {
                        ...userData,
                        userPic: userData.userPic == null ? "/images/user/default-profile.png" : userData.userPic,
                        lng: userData.lng != null ? new Decimal(userData.lng) : 127.048942471228,
                        lat: userData.lat != null ? new Decimal(userData.lat) : 37.5045028775835,
                    };

                    setUser(convertedUser);
                } else {
                    /* 로그인 안 된 경우 & 임시비밀번호 발급 받은 경우 */ 
                    setUser(null);
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
