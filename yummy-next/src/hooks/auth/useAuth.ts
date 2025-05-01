import { useEffect, useState } from 'react';
import { checkLogin } from '@/lib/client/auth/login/checkLogin';


/* deprecated */ 
// export function useAuth(apiBaseUrl: string) {

//     const [user, setUser] = useState(null);

//     useEffect(() => {

//         async function verify() {
//             const u = await checkLogin(apiBaseUrl);
        
//             if (u !== undefined && u !== null) setUser(u);
//         }

//         verify();

//     }, []);

//     return user;
// }