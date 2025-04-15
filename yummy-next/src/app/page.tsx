'use client';

import Script from 'next/script';
import axios from 'axios';

/* Declare naver as a global variable */
import { useEffect, useState } from 'react';
import { initMap } from '@/lib/map/initMap';
import { cherryBlossomTheme, resetMap, recommendRandomStore } from '@/lib/map/mapButton';
import { Store } from '@/types/store';


export default function YummyMap() {
	const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
	const [stores, setStores] = useState<Store[]>([]);
	const [mapInstance, setMapInstance] = useState<any>(null);
	const [markers, setMarkers] = useState<any[]>([]);
	const [zeroPayMarkers, setZeroPayMarkers] = useState<any[]>([]);

	useEffect(() => {
		async function fetchStores() {
			const lngx = 127.0465;
			const laty = 37.5032;
			const defaultStore = { name: '알바천국', lat: laty, lng: lngx, type: 'company' };

			try {

				const res = await axios.get(`${apiBaseUrl}/search/allData`);
				const data = res.data;

				const converted = data.map((s: any) => ({
					name: s.name,
					lat: s.lat,
					lng: s.lng,
					type: s.type,
					isBeefulPay: s.zero_possible,
				}));

				const allStores = [defaultStore, ...converted];
				setStores(allStores);
				
				const { map, markers, zeroPayMarkers } = initMap(allStores);
				setMapInstance(map);
				setMarkers(markers);
				setZeroPayMarkers(zeroPayMarkers);
				
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error('Axios API 요청 에러:', error.response?.status, error.message);
				} else {
					console.error('예상치 못한 에러:', error);
				}
			}
		}

		fetchStores();
	}, []);
	
  return (
    <>
		<Script
			src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=87ni0cgqze&submodules=geocoder"
			strategy="beforeInteractive"
		/>
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
				<button className="cherry-button" onClick={cherryBlossomTheme}>🌸 벚꽃 봄?</button>
				<button className="random-button" onClick={() => recommendRandomStore(stores, mapInstance, zeroPayMarkers)}>🍀 랜덤 추천</button>
				<button className="reset-button"  onClick={() => resetMap(mapInstance)}>🔄 맵 초기화</button>
			</div>
		</div>
    </>
  );
}
