import { debounce } from 'lodash';
import { getGeolocation } from '@/lib/client/map/getGeolocation';
import { fetchAndRenderMarker } from '@/lib/client/map/fetchAndRenderMarker';
import { MapContext } from '@/types/client/map/mapContext';

declare const naver: any;

/* Naver Map 초기화 */
export async function initMap(
    mapContext: MapContext
) {
    
    let lng = mapContext.user?.lng ? mapContext.user.lng : 127.048942471228;
    let lat = mapContext.user?.lat ? mapContext.user.lat : 37.5045028775835;
    
    try {
        
        const geo_location = await getGeolocation();
        
        if (geo_location.lat !== null && geo_location.lng !== null) {
            lat = geo_location.lat;
            lng = geo_location.lng;
        }
    
    } catch (e) {
        console.warn("Geolocation fetch failed, using defaults:", e);
    }

	const map = new naver.maps.Map('map', {
		center: new naver.maps.LatLng(lat,lng),
		zoom: 17,
	});

    mapContext.mapRef.current = map;

    /* 사용자가 지도 움직일때마다 이벤트 발생 */
    const refreshMarkers = debounce(async () => {
        const onlyZero = mapContext.showOnlyZeroPayRef.current;
        mapContext.showOnlyZeroPayPrevRef.current = onlyZero;
        await fetchAndRenderMarker(mapContext, onlyZero);
    }, 500);

    mapContext.refreshMarkersRef.current = refreshMarkers;

    /* 최초 1회 호출 */
    await fetchAndRenderMarker(mapContext, mapContext.showOnlyZeroPay);

    /* 지도 움직이는 이벤트 연결 */
    naver.maps.Event.addListener(map, 'dragend', refreshMarkers);
    naver.maps.Event.addListener(map, 'zoom_changed', refreshMarkers);
}