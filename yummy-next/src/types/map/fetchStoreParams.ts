import { User } from '@/types/user'; // 유저 타입 불러오기
import { Store } from '@/types/store';

export interface FetchStoresParams {
    apiBaseUrl: string;
    user: User | null;
    setStores: (stores: Store[]) => void;
    setMapInstance: (map: any) => void;
    setMarkers: (markers: any[]) => void;
    setZeroPayMarkers: (markers: any[]) => void;
}