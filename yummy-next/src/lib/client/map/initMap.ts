import { Store } from '@/types/shared/store';
import { User } from '@/types/shared/user';
import Decimal from 'decimal.js';

declare const naver: any;
declare const MarkerClustering: any;
declare const N: any;

/* Naver Map 초기화 */
export async function initMap(stores: Store[], user: User | null) {

    const markers: any[] = [];
	const zeroPayMarkers: any[] = [];

    let lng = user?.lng ? user.lng : 127.048942471228;
    let lat = user?.lat ? user.lat : 37.5045028775835;
    
    // console.log("lngx: " + lngx);
    // console.log("laty: " + laty);

    //moon
    try {
        const geo_location = await GetGeolocation();
        if (geo_location.lat !== null && geo_location.lng !== null) {
          console.log("in if geo_location lat, lng", geo_location.lat, geo_location.lng);
          lat = geo_location.lat;
          lng = geo_location.lng;
        }
      } catch (e) {
        console.warn("Geolocation fetch failed, using defaults:", e);
    }

	const map = new naver.maps.Map('map', {
		center: new naver.maps.LatLng(lat,lng),
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
            ? '<div style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background-color: rgba(124, 64, 23, 0.08); color: #7C4017; border-radius: 6px; font-size: 11px; font-weight: 500; margin: 4px 0;">💳 비플페이 가맹점</div>'
            : '';

        const infowindow = new naver.maps.InfoWindow({
            content: `
                <div style="padding: 16px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); text-align: center; font-family: 'Pretendard', sans-serif; max-width: 220px; border: none; position: relative;">
                <div style="font-size: 15px; font-weight: 600; margin-bottom: 8px; color: #1f2937;">
                    ${emoji} ${store.name}
                </div>
                ${beefulPayTag}
                <div id="walking-time-${store.name}" style="font-size: 11px; color: #6b7280; margin: 8px 0;"></div>
                <a href="${directionsUrl}" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; width: 100%; padding: 8px 12px; font-size: 12px; font-weight: 500; color: white; background-color: #7C4017; border-radius: 8px; text-decoration: none; transition: background-color 0.2s;">🗺️ 지도에서 보기</a>
                <div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid white;"></div>
                </div>`,
            borderWidth: 0,
            backgroundColor: "transparent",
            disableAnchor: true
        });

        // 인포윈도우 스타일 오버라이드
        const style = document.createElement('style');
        style.textContent = `
            .naver-map-info-window {
                border: none !important;
                background: transparent !important;
            }
            .naver-map-info-window:after {
                display: none !important;
            }
        `;
        document.head.appendChild(style);

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

function GetGeolocation(){
    let userLat = null;
    let userLng = null;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
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