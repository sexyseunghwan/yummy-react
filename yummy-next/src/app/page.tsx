'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { resetMap, recommendRandomStore } from '@/lib/client/map/mapButton';
import { Store } from '@/types/shared/store';
import { useUser } from '@/context/auth/UserContext';
import { fetchStores } from '@/lib/client/map/fetchStore';
import { Button } from '@/components/common/Button/Button';

export default function YummyMap() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const [stores, setStores] = useState<Store[]>([]);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [zeroPayMarkers, setZeroPayMarkers] = useState<any[]>([]);
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (isLoading) return;

    fetchStores({
      apiBaseUrl,
      user,
      setStores,
      setMapInstance,
      setMarkers,
      setZeroPayMarkers,
    });
  }, [isLoading]);

  return (
    <>
      <Script src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=x014znucr0&submodules=geocoder" strategy="beforeInteractive" />
      <Script src="/js/MarkerClustering.js" strategy="afterInteractive" />
      <Script
        src="https://code.jquery.com/jquery-1.12.4.min.js"
        strategy="beforeInteractive"
        integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
        crossOrigin="anonymous"
      />

      <div
        id="map"
        className="w-full h-full bg-[#e9e9e9]"
      >
        <div className="absolute top-4 left-4 flex gap-2 z-49">
          <Button variant="primary" size="small" onClick={() => recommendRandomStore(stores, mapInstance, zeroPayMarkers)}>랜덤 추천</Button>
          <Button variant="secondary" size="small" onClick={() => resetMap(mapInstance)}>맵 초기화</Button>
        </div>
      </div>
    </>
  );
}
