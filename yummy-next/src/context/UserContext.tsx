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
            .post(`${apiBaseUrl}/login/auth/loginCheck`,{}, { withCredentials: true })
            .then(res => {
                const raw = res.data;
                const convertedUser: User = {
                    ...raw,
                    lngX: new Decimal(raw.lngX),
                    latY: new Decimal(raw.latY)
                };
                setUser(convertedUser);
                setIsLoading(false);
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    setUser(null);
                } else {
                    console.error('[LoginCheck] 예외 발생:', err);
                }
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