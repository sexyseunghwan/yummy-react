// 'use client';

// import Script from 'next/script';

// /* Declare naver as a global variable */
// // declare const naver: any;

// import { useEffect, useState } from 'react';
// import { initMap } from '@/lib/map/initMap';
// import { cherryBlossomTheme, resetMap, recommendRandomStore } from '@/lib/map/mapButton';
// import { Store } from '@/types/store';


// export default function YummyMap() {
// 	/* api 경로 */
// 	const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
// 	const [stores, setStores] = useState<Store[]>([]);
// 	const [mapInstance, setMapInstance] = useState<any>(null);
// 	const [markers, setMarkers] = useState<any[]>([]);
// 	const [zeroPayMarkers, setZeroPayMarkers] = useState<any[]>([]);
	
// 	useEffect(() => {
// 		async function fetchStores() {
// 			const lngx = 127.0465;
// 			const laty = 37.5032;
// 			const defaultStore = { name: '알바천국', lat: laty, lng: lngx, type: 'company' };

// 			//const res = await fetch(`${apiBaseUrl}/search/allData`);
			
// 			if (!res.ok) {
// 				console.error("API 응답 에러:", res.status);
// 				return;
// 			}
// 			const data = await res.json();

// 			const converted = data.map((s: any) => ({
// 				name: s.name,
// 				lat: s.lat,
// 				lng: s.lng,
// 				type: s.type,
// 				isBeefulPay: s.zero_possible,
// 			}));

// 			const allStores = [defaultStore, ...converted];
// 			setStores(allStores);
			
// 			const { map, markers, zeroPayMarkers } = initMap(allStores); 
// 			setMapInstance(map);
// 			setMarkers(markers);
// 			setZeroPayMarkers(zeroPayMarkers);
// 		}

// 		fetchStores();
// 	}, []);

//   return (
//     <>
// 		<Script
// 			src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=87ni0cgqze&submodules=geocoder"
// 			strategy="beforeInteractive"
// 		/>
// 		<Script src="/yummy/js/MarkerClustering.js" strategy="afterInteractive" />
// 		<Script
// 			src="https://code.jquery.com/jquery-1.12.4.min.js"
// 			strategy="beforeInteractive"
// 			integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
// 			crossOrigin="anonymous"
// 		/>
// 		<link rel="stylesheet" href="/yummy/css/yummymap.css" />

//       	<div id="recommendation"></div>

// 		<div id="map">
// 			<div className="map-buttons">
// 				<button className="cherry-button" onClick={cherryBlossomTheme}>🌸 벚꽃 봄?</button>
// 				<button className="random-button" onClick={() => recommendRandomStore(stores, mapInstance, zeroPayMarkers)}>🍀 랜덤 추천</button>
// 				<button className="reset-button"  onClick={() => resetMap(mapInstance)}>🔄 맵 초기화</button>
// 			</div>
// 		</div>
//     </>
//   );
// }


// 아래가 그래프큐엘 코드
'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { initMap } from '@/lib/map/initMap';
import { cherryBlossomTheme, resetMap, recommendRandomStore } from '@/lib/map/mapButton';
import { Store } from '@/types/store';

export default function YummyMap() {
  // 환경변수에 설정된 API URL (예: http://www.seunghwan-dev.kro.kr:18089)
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
        // GraphQL API 호출
        const response = await fetch(`${apiBaseUrl}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLtirjrn7ztlIQiLCJpYXQiOjE3NDQ2MTEzNTcsImF1dGgiOiJVU0VSIn0.b8NvXWTAYTCswEefXzucvOI_3k-tAVbRyA_Pnye__dQ'
          },
          body: JSON.stringify({
            query: `
              query {
                SearchStoreAllData {
                  lat
                  lng
                  name
                  type
                  zeroPossible
                }
              }
            `
          })
        });

        if (!response.ok) {
          console.error("API 응답 에러:", response.status);
          return;
        }

        const jsonResponse = await response.json();
        // GraphQL의 data 필드 안에 있는 SearchStoreAllData 배열을 사용
        const data = jsonResponse.data.SearchStoreAllData;

        // 변환: 백엔드가 보내는 필드명에 맞춰 변경 (zeroPossible → isBeefulPay)
        const converted = data.map((s: any) => ({
          name: s.name,
          lat: s.lat,
          lng: s.lng,
          type: s.type,
          isBeefulPay: s.zeroPossible,
        }));

        const allStores = [defaultStore, ...converted];
        setStores(allStores);

        const { map, markers, zeroPayMarkers } = initMap(allStores);
        setMapInstance(map);
        setMarkers(markers);
        setZeroPayMarkers(zeroPayMarkers);
      } catch (error) {
        console.error("GraphQL 요청 실패:", error);
      }
    }

    fetchStores();
  }, [apiBaseUrl]);

  return (
    <>
      <Script
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=87ni0cgqze&submodules=geocoder"
        strategy="beforeInteractive"
      />
      <Script src="/yummy/js/MarkerClustering.js" strategy="afterInteractive" />
      <Script
        src="https://code.jquery.com/jquery-1.12.4.min.js"
        strategy="beforeInteractive"
        integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="/yummy/css/yummymap.css" />

      <div id="recommendation"></div>

      <div id="map">
        <div className="map-buttons">
          <button className="cherry-button" onClick={cherryBlossomTheme}>🌸 벚꽃 봄?</button>
          <button className="random-button" onClick={() => recommendRandomStore(stores, mapInstance, zeroPayMarkers)}>🍀 랜덤 추천</button>
          <button className="reset-button" onClick={() => resetMap(mapInstance)}>🔄 맵 초기화</button>
        </div>
      </div>
    </>
  );
}
