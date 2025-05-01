export interface ClusterMarker {
    getElement: () => HTMLElement | null;
}

export interface MarkerClusteringOptions {
    minClusterSize: number;
    maxZoom: number;
    map: any; // 정확한 타입을 알고 있다면 대체
    markers: any[]; // 마찬가지로 Marker 타입으로 바꿔도 좋음
    disableClickZoom: boolean;
    gridSize: number;
    icons: any[]; // 클러스터 마커 아이콘 설정
    indexGenerator: number[];
    stylingFunction: (clusterMarker: ClusterMarker, count: number) => void;
}

export declare class MarkerClustering {
    constructor(options: MarkerClusteringOptions);
}