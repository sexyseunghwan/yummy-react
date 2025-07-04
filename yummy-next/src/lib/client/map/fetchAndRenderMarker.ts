import { Store } from '@/types/shared/store';
import { MapBoundsParams } from '@/types/client/map/mapBoundsParams';
import { fetchStores } from '@/lib/client/map/fetchStore';
import { getDistance, getWalkingTime } from '@/lib/client/map/mapCalculate';
import { MapContext } from '@/types/client/map/mapContext';
import { createCacheKey } from '@/lib/client/map/createCaheKey';
import { makeMapCluster } from '@/lib/client/map/makeMapCluster';


export async function fetchAndRenderMarker(
    naver: any,
    mapContext: MapContext
) {
    const storeIcon = 'https://cdn-icons-png.flaticon.com/128/3170/3170733.png';
	const companyIcon = '/images/alba.png';
	const beefulPayIcon = '/images/pay.png';
    
    const bounds = mapContext.mapRef.current.getBounds();
    const sw = bounds.getSW();  /* 지도 남서쪽 좌표 */
    const ne = bounds.getNE();  /* 지도 북동쪽 좌표 */
    const center = bounds.getCenter();
    const zoom = mapContext.mapRef.current.getZoom();   
    
    const params: MapBoundsParams = {
        minLat: sw.lat(),
        maxLat: ne.lat(),
        minLon: sw.lng(),
        maxLon: ne.lng(),
        zoom: zoom
    };

    const cacheKey = createCacheKey(center.lat(), center.lng(), zoom);

    /* 현재 지도 반경안에 없는 지도 marker 는 모두 제거해준다. */
    const markerMap = mapContext.markerMapRef.current;
    const markers = mapContext.markersRef.current;

    for (const [seq, marker] of markerMap.entries()) {
        const pos = marker.getPosition();
        if (!bounds.hasLatLng(pos)) {
            naver.maps.Event.clearInstanceListeners(marker); /* 리스너 제거 */
            marker.setMap(null); /* 지도에서 제거 */ 
            markerMap.delete(seq); /* Map 에서 제거 */ 
            const idx = markers.indexOf(marker);
            if (idx > -1) markers.splice(idx, 1); /* 배열에서도 제거 */ 
        }
    }
    
    /* store 상태를 지도에서 제거 */
    mapContext.setStores([]);

    /* store 상태를 다시 정의 */
    let stores: Store[];
    
    if (mapContext.storeCacheRef.current.has(cacheKey)) {
        stores = mapContext.storeCacheRef.current.get(cacheKey)!;
        //console.log('📦 캐시에서 상점 불러옴');
    } else {
        /* api 호출 */ 
        stores = await fetchStores(mapContext.apiBaseUrl, params);

        /* 데이터 있을 때만 캐시해준다. */
        if (stores.length != 0) {
            mapContext.storeCacheRef.current.set(cacheKey, stores);
        }
        
        //console.log('🌐 API 호출로 상점 가져옴');
    }   
        
    const referenceStore = stores.find((s) => s.name === '알바천국'); 
    mapContext.setStores(stores);
    
    injectInfoWindowStyleOnce();

    /* 테스트 -> 상점이 몇개가 맵에 뿌려지는지 보기 위함. */
    //console.log(mapContext.markerMapRef.current.size);

    stores.forEach((store) => {

        const markerMap = mapContext.markerMapRef.current;

        /* 이미 naver map 이 해당 상점을 가지고 있다면 마커를 추가해주지 않는다. */
        if (markerMap.has(store.seq)) return;
        
		const iconUrl = store.isBeefulPay ? beefulPayIcon : store.type === 'company' ? companyIcon : storeIcon;

        /* 
            아래의 new 를 계속 해서 호출해주면 JS 의 GC 가 자주돌게 되면서 성능에 부하가 발생하므로 조심. 
        */
		const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(store.lat, store.lng),
            map: mapContext.mapRef.current,
            icon: {
                url: iconUrl,
                size: new naver.maps.Size(30, 30),
                scaledSize: new naver.maps.Size(30, 30),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(20, 40),
            },
            draggable: false,
		}); 
        
        markerMap.set(store.seq, marker);
        mapContext.markersRef.current.push(marker);
        
        const emoji = getEmojiForStore(store.name, store.type);
        const directionsUrl = `https://map.naver.com/v5/search/${store.name}?c=${store.lng},${store.lat},17,0,0,0,dh`;
        const beefulPayTag = store.isBeefulPay
            ? '<div style="...">💳 비플페이 가맹점</div>'
            : '';
        const safeId = `walking-time-${store.seq}`;

        const infowindow = new naver.maps.InfoWindow({
            content: createInfoWindowHtml(store, emoji, directionsUrl, beefulPayTag, safeId),
            borderWidth: 0,
            backgroundColor: 'transparent',
            disableAnchor: true,
        });

        naver.maps.Event.addListener(marker, 'click', function () {
            if (infowindow.getMap()) {
                infowindow.close();
            } else {
                infowindow.open(mapContext.mapRef.current, marker);
                
                if (referenceStore) {
                    const distance = getDistance(store.lat, store.lng, referenceStore.lat, referenceStore.lng);
                    const walkingTime = getWalkingTime(distance);
                    const el = document.getElementById(`walking-time-${store.seq}`);
                    if (el) el.innerHTML = `🚶‍♂️ 도보 시간: <b>${walkingTime}분</b>`;
                }
            }
        });
    }); /* forEach  */ 


    makeMapCluster(mapContext);
}


function createInfoWindowHtml(store: Store, emoji: string, directionsUrl: string, beefulPayTag: string, safeId: string): string {
    return `
        <div style="padding: 16px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); text-align: center; font-family: 'Pretendard', sans-serif; max-width: 220px; border: none; position: relative;">
            <div style="font-size: 15px; font-weight: 600; margin-bottom: 8px; color: #1f2937;">
                ${emoji} ${store.name}
            </div>
            ${beefulPayTag}
            <div id="${safeId}" style="font-size: 11px; color: #6b7280; margin: 8px 0;"></div>
            <a href="${directionsUrl}" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; width: 100%; padding: 8px 12px; font-size: 12px; font-weight: 500; color: white; background-color: #7C4017; border-radius: 8px; text-decoration: none; transition: background-color 0.2s;">🗺️ 지도에서 보기</a>
            <div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid white;"></div>
        </div>`;
}

function getEmojiForStore(name: string, type: string): string {
    if (type === 'company') return '🏢';
    if (name.includes('커피') || name.includes('카페')) return '☕';
    if (name.includes('치킨')) return '🍗';
    if (name.includes('버거')) return '🍔';
    return '🍽️';
}

// 한 번만 스타일 추가
function injectInfoWindowStyleOnce() {
    const styleId = 'custom-infowindow-style';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .naver-map-info-window {
                border: none !important;
                background: transparent !important;
            }
            .naver-map-info-window:after {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}