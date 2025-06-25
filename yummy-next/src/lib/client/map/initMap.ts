import { Store } from '@/types/shared/store';
import { User } from '@/types/shared/user';
import { debounce } from 'lodash';
import { getGeolocation } from '@/lib/client/map/getGeolocation';
import { fetchAndRenderMarker } from '@/lib/client/map/fetchAndRenderMarker';

declare const naver: any;

/* Naver Map 초기화 */
export async function initMap(
    apiBaseUrl: string,
    user: User | null,
    //setMapInstance: (map: any) => void,
    mapRef: React.RefObject<any>,
    setStores: (stores: Store[]) => void,
    setMarkers: (markers: any[]) => void,
    setZeroPayMarkers: (zeroPayMarkers: any[]) => void
    
) {
    
    const markers: any[] = [];
	const zeroPayMarkers: any[] = [];
    
    let lng = user?.lng ? user.lng : 127.048942471228;
    let lat = user?.lat ? user.lat : 37.5045028775835;
    
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
        
    //const referenceStore = stores.find((s) => s.name === '알바천국');

    /* 사용자가 지도 움직일때마다 이벤트 발생 */
    const refreshMarkers = debounce(async () => {
        await fetchAndRenderMarker(naver, apiBaseUrl, map, markers, zeroPayMarkers, setStores);
    }, 500);

    /* 최초 1회 호출 */
    await fetchAndRenderMarker(naver, apiBaseUrl, map, markers, zeroPayMarkers, setStores);

    /* 지도 움직이는 이벤트 연결 */
    naver.maps.Event.addListener(map, 'dragend', refreshMarkers);
    naver.maps.Event.addListener(map, 'zoom_changed', refreshMarkers);

    return { map, markers, zeroPayMarkers };
}