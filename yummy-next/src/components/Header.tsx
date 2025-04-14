'use client';

export default function Header() {
  // 페이지 정보나 유저 정보는 props 또는 context로 넘겨줘야 함
  const currentPage = 'yummymap'; // 예시

  const toggleSidebar = () => {
      const sidebar = document.getElementById('sidebar');
      sidebar?.classList.toggle('active');
  }

  return (
    <header>
      <h1>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          가야 할 지도
        </a>
      </h1>
    
      <div className="header-search-container">
        <input
          type="text"
          id="headerSearchInput"
          placeholder="🔍 검색할 가게명을 입력하세요!"
        />
        <button className="header-search-button" onClick={() => {}}>
          검색
        </button>
      </div>

      <div className="hamburger-menu" onClick={toggleSidebar}>
        ☰
      </div>
    </header>
  );
}
