import { MapContext } from '@/types/client/map/mapContext';
import { MapBoundsParams } from '@/types/client/map/mapBoundsParams';
import { createCacheKey } from '@/lib/client/map/createCaheKey';
import { fetchSubway } from './fetchSubway';
import { Subway } from '@/types/client/map/subway';

declare const naver: any;

export async function renderSubway(
    mapContext: MapContext,
    mapBoundParams: MapBoundsParams
) {

    const bounds = mapContext.mapRef.current.getBounds();
    const center = bounds.getCenter();

    const cacheKey = createCacheKey(center.lat(), center.lng(), mapBoundParams.zoom, false);

        /* Subway 상태를 지도에서 제거 */
    mapContext.setSubways([]);

    let subways: Subway[];

    if (mapContext.subwayCacheRef.current.has(cacheKey)) {
        subways = mapContext.subwayCacheRef.current.get(cacheKey) as Subway[];
    } else {
        subways = await fetchSubway(mapContext.apiBaseUrl, mapBoundParams);
    }

    mapContext.setSubways(subways);
    
    injectInfoWindowStyleOnce();

    subways.forEach((subway) => {

        const markerMap = mapContext.markerMapRef.current;

        /* 이미 naver map 이 해당 지하철을 가지고 있다면 마커를 추가해주지 않는다. */
        if (markerMap.has(`subway-${subway.seq}`)) return;

        const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(subway.lat, subway.lng),
            map: mapContext.mapRef.current,
            icon: {
                url: "./images/map/subway.png",
                size: new naver.maps.Size(30, 30),
                scaledSize: new naver.maps.Size(30, 30),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(20, 40),
            },
            draggable: false,
            seq: subway.seq,
            store_type: 'subway'
		});

        markerMap.set(`subway-${subway.seq}`, marker);
        mapContext.markersRef.current.push(marker);


    });

    //const data = await fetchSubway(mapContext.apiBaseUrl, mapBoundParams);

    // data.forEach((item, index) => {
    //     console.log(`index: ${index}, value: ${item}`);
    // })

}


/* 한 번만 스타일 추가 */ 
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