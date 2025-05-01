import { User } from '@/types/shared/user'; // 유저 타입 불러오기
import { Store } from '@/types/shared/store';

export interface FetchStoresParams {
    apiBaseUrl: string;
    user: User | null;
    setStores: (stores: Store[]) => void;
    setMapInstance: (map: any) => void;
    setMarkers: (markers: any[]) => void;
    setZeroPayMarkers: (markers: any[]) => void;
}