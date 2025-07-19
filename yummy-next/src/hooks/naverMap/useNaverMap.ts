'use client';

import { useEffect, useRef, useState } from 'react';
import { Store } from '@/types/shared/store';
import { useUser } from '@/context/auth/UserContext';
import { initMap } from '@/lib/client/map/initMap';
import { MapContext } from '@/types/client/map/mapContext';
import { LRUCache } from '@/class/lruCache';
import { Subway } from '@/types/client/map/subway';

export function useNaverMap() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const mapRef = useRef<any>(null);
    const [stores, setStores] = useState<Store[]>([]);
    const markerMapRef = useRef<Map<string, any>>(new Map());
    const markersRef = useRef<any[]>([]);
    const zeroPayMarkersRef = useRef<any[]>([]);
    const { user, isLoading } = useUser();
    const storeCacheRef = useRef(new LRUCache<string, Store[]>(1024 * 200));
    const clusterRef = useRef<any>(null);
    const refreshMarkersRef = useRef<(() => void) | null>(null);
    const [showOnlyZeroPay, setShowOnlyZeroPay] = useState(false);
    const showOnlyZeroPayPrevRef = useRef<boolean>(false);
    const showOnlyZeroPayRef = useRef<boolean>(false);
    const [subways, setSubways] = useState<Subway[]>([]);
    const subwayCacheRef = useRef(new LRUCache<string, Subway[]>(1024 * 50));

    const mapContext: MapContext = {
        apiBaseUrl,
        mapRef,
        stores,
        setStores,
        markersRef,
        markerMapRef,
        zeroPayMarkersRef,
        user,
        storeCacheRef,
        clusterRef,
        refreshMarkersRef,
        showOnlyZeroPay,
        setShowOnlyZeroPay,
        showOnlyZeroPayPrevRef,
        showOnlyZeroPayRef,
        subways,
        setSubways,
        subwayCacheRef
    };

    useEffect(() => {
        if (isLoading) return;

        const initilizeMap = async () => {
			await initMap(mapContext);
		}

        initilizeMap();

  }, [isLoading]);

    return mapContext;
}