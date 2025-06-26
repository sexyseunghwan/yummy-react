import { User } from '@/types/shared/user';
import { Store } from '@/types/shared/store';
import { LRUCache } from '@/class/lruCache';

export interface MapContext {
    apiBaseUrl: string;
    mapRef: React.RefObject<any>;
    stores: Store[];
    markers: any[];
    zeroPayMarkers: any[];
    setStores: (s: Store[]) => void;
    setMarkers: (m: any[]) => void;
    setZeroPayMarkers: (m: any[]) => void;
    user: User | null;
    storeCacheRef: React.RefObject<LRUCache<string, Store[]>>;
}