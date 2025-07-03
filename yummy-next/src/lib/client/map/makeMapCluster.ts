import { MapContext } from '@/types/client/map/mapContext';

declare const N: any;
declare const MarkerClustering: any;

export function makeMapCluster(mapContext: MapContext) {

    /* 마커가 모두 생성된 이후에 클러스터 처리 */ 
    if (mapContext.clusterRef.current) {
        /* 기존 클러스터 제거 */ 
        //mapContext.clusterRef.current.clear();
        mapContext.clusterRef.current.setMap(null);
        mapContext.clusterRef.current = null;
    }

    /* Map Cluster */
    const htmltag1 = `<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(/images/cluster-marker-1.png);background-size:contain;"></div>`;
    const htmltag2 = `<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(/images/cluster-marker-2.png);background-size:contain;"></div>`;
    const htmltag3 = `<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(/images/cluster-marker-3.png);background-size:contain;"></div>`;
    const htmltag4 = `<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(/images/cluster-marker-4.png);background-size:contain;"></div>`;
    const htmltag5 = `<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(/images/cluster-marker-5.png);background-size:contain;"></div>`;

    const htmlMarker1 = {
        content: htmltag1,
        size: N.Size(40, 40),
        anchor: N.Point(20, 20)
    },
    htmlMarker2 = {
        content: htmltag2,
        size: N.Size(40, 40),
        anchor: N.Point(20, 20)
    },
    htmlMarker3 = {
        content: htmltag3,
        size: N.Size(40, 40),
        anchor: N.Point(20, 20)
    },
    htmlMarker4 = {
        content: htmltag4,
        size: N.Size(40, 40),
        anchor: N.Point(20, 20)
    },
    htmlMarker5 = {
        content: htmltag5,
        size: N.Size(40, 40),
        anchor: N.Point(20, 20)
    };

    const newCluster = new MarkerClustering({
        minClusterSize: 1,
        maxZoom: 16,
        map: mapContext.mapRef.current,
        markers: mapContext.markersRef.current,
        disableClickZoom: false,
        gridSize: 100,
        icons: [htmlMarker1,htmlMarker2,htmlMarker3,htmlMarker4,htmlMarker5],
        indexGenerator: [10, 100, 200, 500, 1000],
        stylingFunction: function (clusterMarker: any, count: number) {
            const el = clusterMarker.getElement();
            const inner = el.querySelector('div');
            if (inner) {
                inner.innerHTML = `${count}`;
            }
        },
    });

    mapContext.clusterRef.current = newCluster;
}