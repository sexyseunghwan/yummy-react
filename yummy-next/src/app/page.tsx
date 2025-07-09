'use client';

import Script from 'next/script';
import { resetMap, recommendRandomStore } from '@/lib/client/map/mapButton';
import { Button } from '@/components/common/Button/Button';
import { useNaverMap } from '@/hooks/naverMap/useNaverMap';
import { fetchAndRenderMarker } from '@/lib/client/map/fetchAndRenderMarker';
import { wrapAsync } from '@/utils/wrapAsync';

export default function YummyMap() {

	const mapContext = useNaverMap();

	/* 초기화 버튼 */
	const handleResetClick = async () => {
		const [_, err] = await wrapAsync(resetMap(mapContext.mapRef.current, mapContext.refreshMarkersRef));
		if (err) {
			console.error("맵 초기화 실패", err);
		}
	};

	/* 버튼을 토글할 경우 */
	const handleZeroPayToggle = async () => {
		let showOnlyZeroPay = !mapContext.showOnlyZeroPay;
		
		mapContext.showOnlyZeroPayPrevRef.current = mapContext.showOnlyZeroPay;
		mapContext.showOnlyZeroPayRef.current = showOnlyZeroPay;
		
		const [_, err] = await wrapAsync(fetchAndRenderMarker(mapContext, showOnlyZeroPay));
		if (err) {
			console.error("", err);
		}
	}
	
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
		
		<div id="map" className="w-full h-full bg-[#e9e9e9]" >
			<div className="absolute top-4 left-4 flex gap-2 z-30">
				<Button variant="primary" size="small" onClick={() => recommendRandomStore(mapContext.stores, mapContext.mapRef.current, mapContext.zeroPayMarkersRef.current, mapContext.markersRef.current)}>랜덤 추천</Button>
				<Button variant="secondary" size="small" onClick={handleResetClick}>맵 초기화</Button>
				{/* <Button variant="zeropay" size="small" onClick={handleZeroPayToggle} className="rounded-full gap-x-2">
					<img src={mapContext.showOnlyZeroPay ? "/images/pay.png" : "/images/map/food_store.png"} 
						alt="비플페이" className="w-5 h-5 rounded-full" 
					/>
					{mapContext.showOnlyZeroPay ? "비플페이" : "전체"}
				</Button> */}
				<Button
					variant="zeropay"
					size="small"
					onClick={handleZeroPayToggle}
					className={`rounded-full gap-x-2 border px-3 py-1 text-sm flex items-center transition-colors ${
						!mapContext.showOnlyZeroPay
							? 'bg-[#8B5E3C] text-white border-[#8B5E3C] hover:bg-[#7A4F30]'
							: 'bg-white text-[#8B5E3C] border-[#D2B48C] hover:bg-[#F5EBDD]'
					}`}>
					<img src="/images/map/food_store.png" alt="전체" className="w-5 h-5 rounded-full" />
					전체
				</Button>

				<Button
					variant="zeropay"
					size="small"
					onClick={handleZeroPayToggle}
					className={`rounded-full gap-x-2 border px-3 py-1 text-sm flex items-center transition-colors ${
						mapContext.showOnlyZeroPay
							? 'bg-[#8B5E3C] text-white border-[#8B5E3C] hover:bg-[#7A4F30]'
							: 'bg-white text-[#8B5E3C] border-[#D2B48C] hover:bg-[#F5EBDD]'
					}`}>
					<img src="/images/pay.png" alt="비플페이" className="w-5 h-5 rounded-full" />
					비플페이
				</Button>

			</div>
		</div>
		</>
	);
}
