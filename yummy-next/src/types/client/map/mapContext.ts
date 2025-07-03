import { User } from '@/types/shared/user';
import { Store } from '@/types/shared/store';
import { LRUCache } from '@/class/lruCache';

export interface MapContext {
    apiBaseUrl: string;
    mapRef: React.RefObject<any>;
    stores: Store[];
    setStores: (s: Store[]) => void;
    markersRef: React.RefObject<any[]>;
    markerMapRef: React.RefObject<Map<number, any>>;
    zeroPayMarkersRef: React.RefObject<any[]>;
    user: User | null;
    storeCacheRef: React.RefObject<LRUCache<string, Store[]>>;
    clusterRef: React.RefObject<any>;
}