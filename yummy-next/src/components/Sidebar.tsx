'use client';

import { useUser } from '@/context/UserContext';
import { checkLoginMain } from '@/lib/login/client/checkLogin';
import axios from 'axios';


export default function Sidebar() {

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const { user, isLoading } = useUser();
    
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar?.classList.toggle('active');
    }
    
    const logout = async () => {
        
        axios.post(`${apiBaseUrl}/login/standardLogout`,
            {},
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true, 
            }
        )
        .then(res => {
            if (res.status === 204) {
                alert("로그아웃 성공");
                window.location.href = '/';
            } else {
                alert('로그아웃에 실패하였습니다.');
            }
        })
        .catch(err => {
            console.error("로그아웃 중 에러 발생:", err);
        });        
        
        // try {
            
        //     const response = await axios.post(`${apiBaseUrl}/login/standardLogout`,
        //         {},
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //             withCredentials: true,
        //         }
        //     );
            
        //     if (response.status === 204) {
        //         window.location.href = '/';
        //     } else {
        //         alert('로그아웃에 실패하였습니다.');
        //     }

        // } catch(err) {
        //     console.error("로그아웃 중 에러 발생:", err);
        // } 


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
