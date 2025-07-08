

function getGridSizeByZoom(zoom: number): number {
  if (zoom >= 18) return 0.001;  // 약 100m
  if (zoom >= 16) return 0.002;  // 약 200m
  if (zoom >= 14) return 0.005;  // 약 500m
  return 0.01;                   // 기본 1km
}

export function createCacheKey(lat: number, lng: number, zoom: number, showOnlyZeroPay: boolean): string {
  const gridSize = getGridSizeByZoom(zoom);
  const keyLat = Math.floor(lat / gridSize) * gridSize;
  const keyLng = Math.floor(lng / gridSize) * gridSize;
  return `${keyLat.toFixed(5)},${keyLng.toFixed(5)},z${zoom},p${showOnlyZeroPay}`;
}
