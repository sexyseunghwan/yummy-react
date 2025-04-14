'use client';

export default function Sidebar() {

    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar?.classList.toggle('active');
    }
    
    return (
    <div className="sidebar" id="sidebar">
        <span className="close-btn" onClick={toggleSidebar}>
        ✖
        </span>
        <ul>

        {/* {user ? (
            <>
            <li>
                <img src={user.picture} alt="프로필" className="profile-img" />
                <p>
                <strong>{user.name}</strong>
                </p>
            </li>
            <li>
                <a href="#" onClick={() => logout()}>
                로그아웃
                </a>
            </li>
            {user.is_admin && (
                <li>
                <a href="/admin">관리자 페이지</a>
                </li>
            )}
            </>
        ) : (
            <li>
            <a href="#" className="login-button" onClick={() => mainLoginCheck()}>
                로그인
            </a>
            </li>
        )} */}

            <li>
                <a href="#" className="login-button">로그인</a>
            </li>
        </ul>
    </div>
  );
}
