'use client';

import { useEffect, useRef, useState } from 'react';
import { Store } from '@/types/shared/store';
import { useUser } from '@/context/auth/UserContext';
import { initMap } from '@/lib/client/map/initMap';
import { MapContext } from '@/types/client/map/mapContext';
import { LRUCache } from '@/class/lruCache';

export function useNaverMap() {

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const mapRef = useRef<any>(null);
    const [stores, setStores] = useState<Store[]>([]);
    //const [markers, setMarkers] = useState<any[]>([]);
    //const [zeroPayMarkers, setZeroPayMarkers] = useState<any[]>([]);
    const markerMapRef = useRef<Map<number, any>>(new Map());
    const markersRef = useRef<any[]>([]);
    const zeroPayMarkersRef = useRef<any[]>([]);
    const { user, isLoading } = useUser();
    const storeCacheRef = useRef(new LRUCache<string, Store[]>(1024 * 200));

    useEffect(() => {
        if (isLoading) return;

        // const mapContext: MapContext = {
        //     apiBaseUrl,
        //     mapRef,
        //     stores,
        //     markers,
        //     zeroPayMarkers,
        //     setStores,
        //     setMarkers,
        //     setZeroPayMarkers,
        //     user,
        //     storeCacheRef
        // };

        const mapContext: MapContext = {
            apiBaseUrl,
            mapRef,
            stores,
            setStores,
            markersRef,
            markerMapRef,
            zeroPayMarkersRef,
            user,
            storeCacheRef
        };

        const initilizeMap = async () => {
			await initMap(mapContext);
		}

        initilizeMap();

  }, [isLoading]);

    // return {
    //     mapRef,
    //     stores,
    //     zeroPayMarkers
    // };

    return {
        mapRef,
        stores,
        zeroPayMarkersRef
    };
}