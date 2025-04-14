
import Script from 'next/script';
import { useEffect, useState } from 'react';


type Store = {
	name: string;
	lat: number;
	lng: number;
	type: string;
	isBeefulPay?: boolean;
  };

export default function Home() {

	const [stores, setStores] = useState<Store[]>([]);

	useEffect(() => {
		async function fetchStores() {
		  let lngx = 127.046582379785;
		  let laty = 37.5032355765545;
	
		//   if (typeof window !== 'undefined' && window.env?.login_user) {
		// 	lngx = window.env.login_user.detail[0].lngx;
		// 	laty = window.env.login_user.detail[0].laty;
		//   }
	
		  const defaultStore = { name: "알바천국", lat: laty, lng: lngx, type: "company" };
	
		  try {
			const response = await fetch(`${window.env.api_base_url}/search/allData`, {
			  method: 'GET',
			  headers: {
				'Content-Type': 'application/json',
			  },
			});
	
			const data = await response.json();
	
			const fetchedStores: Store[] = data.map((store: any) => ({
			  name: store.name,
			  lat: store.lat,
			  lng: store.lng,
			  type: store.type,
			  isBeefulPay: store.zero_possible,
			}));
	
			const allStores = [defaultStore, ...fetchedStores];
	
			if (allStores.length === 0) {
			  alert("등록된 가게가 없습니다.");
			}
	
			setStores(allStores);
	
			// 🚀 지도 초기화
			SetMap(allStores);
	
		  } catch (err) {
			console.error('가게 데이터를 가져오는 중 오류:', err);
			alert('가게 데이터를 불러오는 중 문제가 발생했습니다.');
		  }
		}
	
		fetchStores();
	  }, []);




	return (
	<>
		{/* ✅ 외부 스크립트 로드 */}
		<Script
		src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=87ni0cgqze&submodules=geocoder"
		strategy="beforeInteractive"
		/>
		<Script
		src="yummy/js/MarkerClustering.js"
		strategy="afterInteractive"
		/>
		<Script
		src="yummy/js/yummymap.js"
		strategy="afterInteractive"
		/>
		<Script
		src="https://code.jquery.com/jquery-1.12.4.min.js"
		strategy="beforeInteractive"
		integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
		crossOrigin="anonymous"
		/>


		{/* ✅ 지도 영역 */}
		<div id="recommendation"></div>

		<div id="map">
		<div className="map-buttons">
			{/* <button className="cherry-button" onClick={() => window.cherryBlossomTheme?.()}>
			🌸 벚꽃 봄?
			</button>
			<button className="random-button" onClick={() => window.recommendRandomStore?.()}>
			🍀 랜덤 추천
			</button>
			<button className="reset-button" onClick={() => window.resetMap?.()}>
			🔄 맵 초기화
			</button> */}

			{/* 아래는 로그인 정보가 있을 때만 노출되도록 구성 */}
			{/* user 정보를 props나 context로 전달해야 실제 조건부 렌더링 가능 */}
		</div>
		</div>
	</>
	);
}
