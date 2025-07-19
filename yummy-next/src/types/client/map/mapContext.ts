import { User } from '@/types/shared/user';
import { Store } from '@/types/shared/store';
import { LRUCache } from '@/class/lruCache';
import { Subway } from './subway';

export interface MapContext {
    apiBaseUrl: string;
    mapRef: React.RefObject<any>;
    stores: Store[];
    setStores: (s: Store[]) => void;
    markersRef: React.RefObject<any[]>;
    markerMapRef: React.RefObject<Map<string, any>>;
    zeroPayMarkersRef: React.RefObject<any[]>;
    user: User | null;
    storeCacheRef: React.RefObject<LRUCache<string, Store[]>>;
    clusterRef: React.RefObject<any>;
    refreshMarkersRef: React.RefObject<(() => void) | null>;
    showOnlyZeroPay: boolean;
    setShowOnlyZeroPay: (s: boolean) => void;
    showOnlyZeroPayPrevRef: React.RefObject<boolean>;
    showOnlyZeroPayRef: React.RefObject<boolean>;
    subways: Subway[];
    setSubways: (s: Subway[]) => void;
    subwayCacheRef: React.RefObject<LRUCache<string, Subway[]>>;
}
