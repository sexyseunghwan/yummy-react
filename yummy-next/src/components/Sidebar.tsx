'use client';

import { useUser } from '@/context/UserContext';
import { logOut } from '@/lib/login/client/logOutHandler';
import styles from './Sidebar.module.css';


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
                            <img src={user.userPic} alt="프로필" className={styles.profileImg} />
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
