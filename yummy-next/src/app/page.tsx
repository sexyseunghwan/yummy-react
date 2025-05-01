'use client';

import Script from 'next/script';

/* Declare naver as a global variable */
import { useEffect, useState, useRef } from 'react';
import { cherryBlossomTheme, resetMap, recommendRandomStore } from '@/lib/client/map/mapButton';
import { Store } from '@/types/shared/store';
import { useUser } from '@/context/auth/UserContext';
import { fetchStores } from '@/lib/client/map/fetchStore';


export default function YummyMap() {

	const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
	const [stores, setStores] = useState<Store[]>([]);
	const [mapInstance, setMapInstance] = useState<any>(null);
	const [markers, setMarkers] = useState<any[]>([]);
	const [zeroPayMarkers, setZeroPayMarkers] = useState<any[]>([]);
	const { user, isLoading } = useUser();
	
	useEffect(() => {
		
		if (isLoading) return;

		fetchStores({apiBaseUrl, user, setStores, setMapInstance, setMarkers, setZeroPayMarkers});

	}, [isLoading]);

  return (
    <>
		<Script	src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=x014znucr0&submodules=geocoder" strategy="beforeInteractive" />

		<Script src="/js/MarkerClustering.js" strategy="afterInteractive" />
		<Script
			src="https://code.jquery.com/jquery-1.12.4.min.js"
			strategy="beforeInteractive"
			integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
			crossOrigin="anonymous"
		/>

		<link rel="stylesheet" href="/css/yummymap.css" />
		
      	<div id="recommendation"></div>

		<div id="map">
			<div className="map-buttons">
				<button className="random-button" onClick={() => recommendRandomStore(stores, mapInstance, zeroPayMarkers)}>🍀 랜덤 추천</button>
				<button className="reset-button"  onClick={() => resetMap(mapInstance)}>🔄 맵 초기화</button>
			</div>
		</div>
    </>
  );
}
