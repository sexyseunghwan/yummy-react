import axios from 'axios';
import { MapBoundsParams } from '@/types/client/map/mapBoundsParams';
import { Store } from '@/types/shared/store';

/**
 * 지도 & Store 을 랜더링 해주는 함수
 * @param apiBaseUrl 
 * @param params 
 * @returns 
 */
export async function fetchStores(
    apiBaseUrl: string,
    mapParams: MapBoundsParams,
    showOnlyZeroPay: boolean
): Promise<Store[]> {
    
    try {

        const res = await axios.get(`${apiBaseUrl}/search/searchStore`, { params: {
                ...mapParams,
                showOnlyZeroPay
            } 
        });
        
        const data = res.data;

        const defaultStore = { name: '알바천국', lat: 37.5032, lng: 127.0465, type: 'cp', isBeefulPay: false, categoryIcon: "" };

        const converted = data.map((s: any) => ({
            seq: s.seq,
            name: s.name,
            lat: s.lat,
            lng: s.lng,
            type: s.type,
            isBeefulPay: s.zero_possible,
            categoryIcon: s.category_icon
        }));

        const allStores = [defaultStore, ...converted];

        return allStores;
    } catch (err) {
        console.error('[Error]', err);
        return [];
    }
}