'use client';

import { useUser } from '@/context/UserContext';
import { checkLoginMain } from '@/lib/login/checkLoginMain';
import axios from 'axios';


// 임시용
// declare global {
// 	interface Window {
// 		mainLoginCheck?: () => void;
// 	}
// }


export default function Sidebar() {

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const { user, isLoading } = useUser();

    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar?.classList.toggle('active');
    }
    
    const logout = async () => {
        // 로그아웃 로직 작성 (예: 쿠키 삭제 후 리다이렉트)
        // document.cookie = "yummy-access-token=; Max-Age=0; path=/;";
        // document.cookie = "yummy-user-id=; Max-Age=0; path=/;";
        //window.location.href = "/";
        //alert('로그아웃!');
        try {
            
            const response = await axios.post(`${apiBaseUrl}/login/standardLogout`,
                {},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            
            if (response.status === 204) {
                window.location.href = '/';
            } else {
                alert('로그아웃에 실패하였습니다.');
            }

        } catch(err) {
            console.error("로그아웃 중 에러 발생:", err);
        } 


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
                            <a href="#" onClick={logout}>로그아웃</a>
                        </li>
                        {/* {user.is_admin && (
                            <li>
                                <a href="/admin">관리자 페이지</a>
                            </li>
                        )} */}
                    </>
                ) : (
                    <li>
                        <a href="#" className="login-button" onClick={() => checkLoginMain(apiBaseUrl)}>로그인</a>
                    </li>
                )}
            </ul>
        </div>
    );
}
