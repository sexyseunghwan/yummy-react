import { Store } from '@/types/store';
import { User } from '@/types/user';
import Decimal from 'decimal.js';

declare const naver: any;
declare const MarkerClustering: any;
declare const N: any;

/* Naver Map 초기화 */
export async function initMap(stores: Store[], user: User | null) {

    const markers: any[] = [];
	const zeroPayMarkers: any[] = [];

    let lngx = user?.lngX ? user.lngX : 127.048942471228;
    let laty = user?.latY ? user.latY : 37.5045028775835;

    const geo_location = await GetGeolocation();
    console.log("after function call geo_location object",geo_location);
    if(geo_location.lat !== null && geo_location.lng !== null){
        console.log("in if geo_location lat, lng",geo_location.lat,geo_location.lng);
        laty = geo_location.lat;
        lngx = geo_location.lng;
    }

    //naver maps의 경우 lat, lng 순서가 반대이므로 주의
    //현재 잘못 세팅 되고 있는 거 같음 전체 적으로 점검이 필요 함 
    //우선 변수 세팅 변경 작업 진행 후 확인 필요
	const map = new naver.maps.Map('map', {
		center: new naver.maps.LatLng(laty,lngx),
		zoom: 17,
	});
        
	const storeIcon = 'https://cdn-icons-png.flaticon.com/128/3170/3170733.png';
	const companyIcon = '/images/alba.png';
	const beefulPayIcon = '/images/pay.png';

	const referenceStore = stores.find((s) => s.name === '알바천국');

	stores.forEach((store) => {
		const iconUrl = store.isBeefulPay ? beefulPayIcon : store.type === 'company' ? companyIcon : storeIcon;

		const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(store.lat, store.lng),
            map: map,
            icon: {
                url: iconUrl,
                size: new naver.maps.Size(30, 30),
                scaledSize: new naver.maps.Size(30, 30),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(20, 40),
            },
            draggable: false,
		});

        markers.push(marker);
        zeroPayMarkers.push({ storeName: store.name, marker: marker });

        const emoji = store.type === 'company'
            ? '🏢'
            : store.name.includes('커피') || store.name.includes('카페')
            ? '☕'
            : store.name.includes('치킨')
            ? '🍗'
            : store.name.includes('버거')
            ? '🍔'
            : '🍽️';

        const directionsUrl = `https://map.naver.com/v5/search/${store.name}?c=${store.lng},${store.lat},17,0,0,0,dh`;
        const beefulPayTag = store.isBeefulPay
            ? '<div style="color: green; font-weight: bold;">💳 비플페이 가맹점</div>'
            : '';

        const infowindow = new naver.maps.InfoWindow({
            content: `
                <div style="padding: 10px; border-radius: 10px; background-color: #FFF8DC; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); text-align: center; font-family: 'Comic Sans MS', sans-serif; max-width: 200px;">
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">
                    ${emoji} ${store.name}
                </div>
                ${beefulPayTag}
                <div id="walking-time-${store.name}" style="font-size: 14px; color: #555;"></div>
                <a href="${directionsUrl}" target="_blank" style="display: inline-block; padding: 5px 10px; font-size: 14px; color: white; background-color: #FF8C00; border-radius: 5px; text-decoration: none; font-weight: bold;">🗺️ 지도에서 보기</a>
                </div>`,
        });

        naver.maps.Event.addListener(marker, 'click', function () {
            if (infowindow.getMap()) {
                infowindow.close();
            } else {

                infowindow.open(map, marker);
                
                if (referenceStore) {
                    const distance = getDistance(store.lat, store.lng, referenceStore.lat, referenceStore.lng);
                    const walkingTime = getWalkingTime(distance);
                    const el = document.getElementById(`walking-time-${store.name}`);
                    if (el) el.innerHTML = `🚶‍♂️ 도보 시간: <b>${walkingTime}분</b>`;
                }
            }
        });

    }); // forEach 
    
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

    new MarkerClustering({
        minClusterSize: 1,
        maxZoom: 16,
        map,
        markers,
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

    return { map, markers, zeroPayMarkers };
}
	

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const R = 6371;
	const dLat = (lat2 - lat1) * (Math.PI / 180);
	const dLon = (lon2 - lon1) * (Math.PI / 180);
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return parseFloat((R * c).toFixed(2));
}

function getWalkingTime(distanceKm: number): number {
    const speed = 3.5;
    return Math.ceil((distanceKm / speed) * 60);
}	

async function GetGeolocation(){
    let userLat = null;
    let userLng = null;
    
    if (navigator.geolocation) {
        console.log("Geolocation"+navigator.geolocation);
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("위치 정보가 성공적으로 수신되었습니다."+position);
            console.log("위도: " + position.coords.latitude + ", 경도: " + position.coords.longitude);
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;

        }, function(event) {
            if (event.code === 1) {
                alert("위치 정보 사용이 거부되었습니다.");
            } else if (event.code === 2) {
                alert("위치 정보를 찾을 수 없습니다.");
            } else if (event.code === 3) {
                alert("위치 정보 요청이 시간 초과되었습니다.");
            } else {
                alert("알 수 없는 오류가 발생했습니다.");
            }
        });
    } else {
        alert("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }

    return {lat: userLat, lng: userLng };
}