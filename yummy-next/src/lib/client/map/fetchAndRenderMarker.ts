import { Store } from '@/types/shared/store';
import { MapBoundsParams } from '@/types/client/map/mapBoundsParams';
import { fetchStores } from '@/lib/client/map/store/fetchStore';
import { getDistance, getWalkingTime } from '@/lib/client/map/mapCalculate';
import { MapContext } from '@/types/client/map/mapContext';
import { createCacheKey } from '@/lib/client/map/createCaheKey';
import { makeMapCluster } from '@/lib/client/map/makeMapCluster';
import { renderStore } from './store/renderStore';
import { renderSubway } from './subway/renderSubway';

declare const naver: any;

export async function testFunc(mapContext: MapContext, showOnlyZeroPay: boolean) {

    mapContext.setShowOnlyZeroPay(showOnlyZeroPay);

    console.log(showOnlyZeroPay);

}


/**
 * 네이버 지도에 마커를 찍어주는 함수
 * @param mapContext 
 * @param showOnlyZeroPay 
 */
export async function fetchAndRenderMarker(
    mapContext: MapContext,
    showOnlyZeroPay: boolean
) {

    /* 맵에서 마커를 정리해주는 부분 */
    if (mapContext.showOnlyZeroPayPrevRef.current === mapContext.showOnlyZeroPayRef.current) {
        deleteBoundaryMarkers(mapContext)
    } else {
        deleteAllMarkers(mapContext)
    }

    const bounds = mapContext.mapRef.current.getBounds();
    const sw = bounds.getSW();  /* 지도 남서쪽 좌표 */
    const ne = bounds.getNE();  /* 지도 북동쪽 좌표 */
    const zoom = mapContext.mapRef.current.getZoom();   
    
    const mapBoundParams: MapBoundsParams = {
        minLat: sw.lat(),
        maxLat: ne.lat(),
        minLon: sw.lng(),
        maxLon: ne.lng(),
        zoom: zoom
    };
    
    /* 상점 마커 render */
    await renderStore(mapContext, showOnlyZeroPay, mapBoundParams);
    
    /* 지하철 마커 render */
    await renderSubway(mapContext, mapBoundParams);
    
    
}

/**
 * 맵의 모든 마커를 제거해주는 함수
 * @param mapContext 
 */
function deleteAllMarkers(mapContext: MapContext) {
    
    const markerMap = mapContext.markerMapRef.current;
    const markers = mapContext.markersRef.current;

    for (const [seq, marker] of markerMap.entries()) {
        naver.maps.Event.clearInstanceListeners(marker); /* 리스너 제거 */
        markerMap.delete(seq); /* Map 에서 제거 */ 
        marker.setMap(null); /* 지도에서 제거 */ 
        const idx = markers.indexOf(marker);
        if (idx > -1) markers.splice(idx, 1); /* 배열에서도 제거 */ 
    }
}


/**
 * 맵에서 안보이는 영역의 마커를 모두 제거해주는 함수
 * @param markerMap 
 * @param markers 
 * @param bounds 
 */
function deleteBoundaryMarkers(mapContext: MapContext) {

    const markerMap = mapContext.markerMapRef.current;
    const markers = mapContext.markersRef.current;
    const bounds = mapContext.mapRef.current.getBounds();

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

}