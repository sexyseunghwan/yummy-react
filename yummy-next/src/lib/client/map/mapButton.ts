/* Declare naver as a global variable */
declare const naver: any;

import { Store } from '@/types/shared/store';

/* 벚꽃관련 버튼 함수 */
export function cherryBlossomTheme() {
	window.open(
		'https://map.naver.com/p/search/%EB%B2%9A%EA%BD%83%EB%AA%85%EC%86%8C%20%EA%B0%80%EB%B3%BC%20%EB%A7%8C%ED%95%9C%20%EA%B3%B3?c=6.00,0,0,0,dh'
	);
}

/* 랜덤 음식점 뽑기 버튼 */
export function recommendRandomStore(
    stores: Store[],
    map: any,
    zeroPayMarkers: any[]) {
    
    if (!map || stores.length === 0) return;

    const candidates = stores.filter((store) => store.type !== 'company');

    if (candidates.length === 0) {
        alert('등록된 맛집이 없습니다!');
        return;
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);
    const winner = candidates[randomIndex];

    const recommendationEl = document.getElementById('recommendation');

    if (recommendationEl) {
        recommendationEl.innerHTML = `🎉 ${winner.name}!`;
        recommendationEl.style.display = 'block';
        setTimeout(() => {
            recommendationEl.style.display = 'none';
        }, 3000);
    }

    const marker = zeroPayMarkers.find((m) => m.storeName === winner.name);

    if (marker) {
        naver.maps.Event.trigger(marker.marker, 'click');
        map.setZoom(18);
        map.setCenter(marker.marker.getPosition());
    }
  }

/* 맵 reset 버튼 */
export function resetMap(map: any) {

    //const map = (window as any).yummyMapInstance;

    const lngx = 127.0489;
    const laty = 37.5045;

    // if(!!window.env && !!window.env.login_user){
    //     lngx = window.env.login_user.detail[0].lngx;
    //     laty = window.env.login_user.detail[0].laty
    //     }

    map.setCenter(new naver.maps.LatLng(laty, lngx));
    map.setZoom(17);
    map.closeInfoWindow();
}