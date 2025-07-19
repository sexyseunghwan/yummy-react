import axios from 'axios';
import { Subway } from '@/types/client/map/subway';
import { MapBoundsParams } from '@/types/client/map/mapBoundsParams';

export async function fetchSubway(
    apiBaseUrl: string,
    mapParams: MapBoundsParams
): Promise<Subway[]> {


    try {

        const res = await axios.get(`${apiBaseUrl}/search/searchSubway`, {params: mapParams});

        const data = res.data;
        
        const converted = data.map((s:any) => ({
            seq: s.seq,
            subwayLine: s.subwayLine,
            stationName: s.stationName,
            stationEngName: s.stationEngName,
            lat: s.lat,
            lng: s.lng,
            stationLoadAddr: s.stationLoadAddr
        }));


        return converted;
    } catch(err) {
        console.error('[Error]', err);
        return [];
    }

}