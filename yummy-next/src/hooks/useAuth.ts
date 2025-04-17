import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkLogin } from '@/lib/login/client/checkLogin';


export function useAuth(apiBaseUrl: string) {
    
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function verify() {
            const u = await checkLogin(apiBaseUrl);
        
            if (u) setUser(u);
        }

        verify();
    }, []);

    return user;
}