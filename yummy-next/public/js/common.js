function toggleMenu() {
    const menu = document.getElementById('status-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

async function CallKaKaoLogout() {
    if (!window.Kakao || !Kakao.isInitialized()) {
        console.error("Kakao SDK가 로드되지 않았거나 초기화되지 않았습니다.");
        alert("Kakao SDK가 초기화되지 않았습니다. 다시 시도해주세요.");
        return;
    }

    try {
        
         if(Kakao.Auth.getAccessToken()){
            await Kakao.Auth.logout();
            console.log("카카오 로그아웃 완료");
         }

        // 서버에서도 로그아웃 처리
        await fetch('/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        alert("로그아웃 완료");
        setTimeout(() => {
            window.location.href = "/login";
        }, 500);
    } catch (err) {
        console.error("카카오 로그아웃 실패:", err);
        alert("카카오 로그아웃 실패");
    }
}
function filterStoreList() {
    alert('준비중 입니다');
    return;       
}