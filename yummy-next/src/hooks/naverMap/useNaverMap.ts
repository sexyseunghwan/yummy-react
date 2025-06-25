'use client';

import { useEffect, useRef, useState } from 'react';
import { User } from '@/types/shared/user';
import { Store } from '@/types/shared/store';
import { useUser } from '@/context/auth/UserContext';
import { initMap } from '@/lib/client/map/initMap';

export function useNaverMap() {

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const mapRef = useRef<any>(null);
    const [stores, setStores] = useState<Store[]>([]);
    const [markers, setMarkers] = useState<any[]>([]);
    const [zeroPayMarkers, setZeroPayMarkers] = useState<any[]>([]);
    const { user, isLoading } = useUser();

    useEffect(() => {
        if (isLoading) return;

        const initilizeMap = async () => {
			await initMap(apiBaseUrl, user, mapRef, setStores, setMarkers, setZeroPayMarkers);
		}

        initilizeMap();

  }, [isLoading]);

    return {
        mapRef,
        stores,
        zeroPayMarkers
    };
}