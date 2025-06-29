'use client';

import Script from 'next/script';
import { useEffect, useState, useRef } from 'react';
import { resetMap, recommendRandomStore } from '@/lib/client/map/mapButton';
import { Store } from '@/types/shared/store';
import { useUser } from '@/context/auth/UserContext';
import { Button } from '@/components/common/Button/Button';
import { initMap } from '@/lib/client/map/initMap';
import { useNaverMap } from '@/hooks/naverMap/useNaverMap';

export default function YummyMap() {
	// const { mapRef, stores, zeroPayMarkers } = useNaverMap();
	const { mapRef, stores, zeroPayMarkersRef } = useNaverMap();

	return (
		<>
		<Script src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=x014znucr0&submodules=geocoder" strategy="beforeInteractive" />
		<Script src="/js/MarkerClustering.js" strategy="afterInteractive" />
		<Script
			src="https://code.jquery.com/jquery-1.12.4.min.js"
			strategy="beforeInteractive"
			integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
			crossOrigin="anonymous"
		/>

		<div
			id="map"
			className="w-full h-full bg-[#e9e9e9]" 
		>
			<div className="absolute top-4 left-4 flex gap-2 z-30">
			<Button variant="primary" size="small" onClick={() => recommendRandomStore(stores, mapRef.current, zeroPayMarkersRef.current)}>랜덤 추천</Button>
			<Button variant="secondary" size="small" onClick={() => resetMap(mapRef.current)}>맵 초기화</Button>
			</div>
		</div>
		</>
	);
}
