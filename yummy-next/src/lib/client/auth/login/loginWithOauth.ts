declare global {
    interface Window {
        Kakao?: any;
    }
}

export function loginWithKakao() {
    const kakaoRedirectUrl = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL || '';

    if (typeof window !== 'undefined' && window.Kakao) {
        const Kakao = window.Kakao;
        
        if (!Kakao.isInitialized()) {
            console.error('Kakao SDK가 초기화되지 않았습니다.');
            return;
        }

        Kakao.Auth.authorize({
            prompt: 'select_account',
            redirectUri: kakaoRedirectUrl,
        });
        
    } else {
        console.error('Kakao SDK가 아직 로드되지 않았습니다.');
    }
}

export function loginWithNaver() {
    alert("현재 서비스 준비중입니다.")
}


export function loginWithTelegram() {
    alert("현재 서비스 준비중입니다.")
}


export function loginWithGoogle() {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    const googleAuthUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL || '';
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL || '';

    const scope = encodeURIComponent('openid profile email');
    const state = encodeURIComponent('your-random-state'); 
    

    const oauthUrl = `${googleAuthUrl}?response_type=code&client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&access_type=offline&prompt=consent`;

    window.location.href = oauthUrl;
}