'use client';

import Link from 'next/link';

export default function Header() {
  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.toggle('active');
  };

  return (
    <header>
      <h1>
		<Link href="/" passHref>
			<span style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
			가야 할 지도
			</span>
		</Link>
      </h1>

      <div className="header-search-container">
        <input
          type="text"
          id="headerSearchInput"
          placeholder="검색할 가게명을 입력하세요!"
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
