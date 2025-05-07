'use client';

import { useUser } from '@/context/auth/UserContext';
import { checkLoginMain } from '@/lib/client/auth/login/checkLogin';
import { logOut } from '@/lib/client/auth/login/logOutHandler';
import axios from 'axios';


export default function Sidebar() {

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const { user, isLoading } = useUser();
    
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar?.classList.toggle('active');
    }

    const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        logOut(apiBaseUrl);
    };
    
    return (
        <div className="sidebar" id="sidebar">
            <span className="close-btn" onClick={toggleSidebar}>
            ✖
            </span>
            <ul>
                {!isLoading && user ? (
                    <>
                        <li>
                            {/* <img src={user.picture} alt="프로필" className="profile-img" /> */}
                            <p><strong>{user.userNm}</strong></p>
                        </li>
                        <li>
                            <a href="#" onClick={handleLogoutClick}>로그아웃</a>
                        </li>
                    </>
                ) : (
                    <li>
                        <a href="/login" className="login-button">로그인</a>
                    </li>
                )}
            </ul>
        </div>
    );
}
