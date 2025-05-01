import axios from 'axios';
import { FetchStoresParams } from '@/types/client/map/fetchStoreParams';
import { initMap } from '@/lib/client/map/initMap';

/**
 * 지도 & Store 을 랜더링 해주는 함수
 * @param param0 
 */
export async function fetchStores({
    apiBaseUrl,
    user,
    setStores,
    setMapInstance,
    setMarkers,
    setZeroPayMarkers,
}: FetchStoresParams) {

    const defaultStore = { name: '알바천국', lat: 37.5032, lng: 127.0465, type: 'cp' };

    axios.get(`${apiBaseUrl}/search/allData`)
         .then(res => {
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
                
                const { map, markers, zeroPayMarkers } = initMap(allStores, user);
                
                setMapInstance(map);
                setMarkers(markers);
                setZeroPayMarkers(zeroPayMarkers);

            })
            .catch(err => {
                console.error('[Error]', err);
            });
}