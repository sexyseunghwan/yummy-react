import { fetchAndRenderMarker } from '@/lib/client/map/fetchAndRenderMarker';

/* Declare naver as a global variable */
declare const naver: any;

import { Store } from '@/types/shared/store';

/* 벚꽃관련 버튼 함수 */
export function cherryBlossomTheme() {
	window.open(
		'https://map.naver.com/p/search/%EB%B2%9A%EA%BD%83%EB%AA%85%EC%86%8C%20%EA%B0%80%EB%B3%BC%20%EB%A7%8C%ED%95%9C%20%EA%B3%B3?c=6.00,0,0,0,dh'
	);
}

/**
 * 랜덤 음식점 뽑기 버튼
 * @param stores 
 * @param map 
 * @param zeroPayMarkers 
 * @param markersRef 
 * @returns 
 */
export function recommendRandomStore(
    stores: Store[],
    map: any,
    zeroPayMarkers: any[],
    markersRef: any[]
) {

    alert('서비스 준비중입니다.');

    return;

    // if (!map || stores.length === 0) {
    //     alert("시야 내에 음식점이 존재하지 않습니다.")
    //     return;
    // }
    const candidates = stores.filter((store) => store.type !== 'company');
    
    if (candidates.length === 0) {
        alert('등록된 맛집이 없습니다!');
        return;
    }

    console.log(`${stores.length}`);
    
    const randomIndex = Math.floor(Math.random() * stores.length);

    console.log(`${randomIndex}`);

    const winner = stores[randomIndex];

    console.log(`${winner.name}`);

    //candidates.forEach(store => console.log(store));
    // const randomIndex = Math.floor(Math.random() * markersRef.length);
    // const winner = markersRef[randomIndex];

    if (winner) {
        naver.maps.Event.trigger(winner.marker, 'click');
        map.setZoom(18);
        map.setCenter(winner.marker.getPosition());
    }

    // const recommendationEl = document.getElementById('recommendation');

    // console.log(recommendationEl);

    // if (recommendationEl) {
    //     recommendationEl.innerHTML = `🎉 ${winner.name}!`;
    //     recommendationEl.style.display = 'block';
    //     setTimeout(() => {
    //         recommendationEl.style.display = 'none';
    //     }, 3000);
    // }

    //const marker = stores.find((m) => m.name === winner.name);

    // console.log(marker);

    // if (marker) {
    //     naver.maps.Event.trigger(marker.marker, 'click');
    //     map.setZoom(18);
    //     map.setCenter(marker.marker.getPosition());
    // }
  }

/* 맵 reset 버튼 */
export async function resetMap(map: any, refreshMarkersRef?: React.RefObject<(() => void) | null>) {
    const lngx = 127.0489;
    const laty = 37.5045;

    map.setCenter(new naver.maps.LatLng(laty, lngx));
    map.setZoom(17);
    map.closeInfoWindow();

    if (refreshMarkersRef?.current) {
		await refreshMarkersRef.current();
	}
}