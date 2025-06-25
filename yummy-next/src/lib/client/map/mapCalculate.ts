/**
 * 거리가 얼마인지 구해주는 함수
 * @param lat1 
 * @param lon1 
 * @param lat2 
 * @param lon2 
 * @returns 
 */
export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const R = 6371;
	const dLat = (lat2 - lat1) * (Math.PI / 180);
	const dLon = (lon2 - lon1) * (Math.PI / 180);
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return parseFloat((R * c).toFixed(2));
}

/**
 * 도보로 몇분이나 걸리는지 구해주는 함수
 * @param distanceKm 
 * @returns 
 */
export function getWalkingTime(distanceKm: number): number {
    const speed = 3.5;
    return Math.ceil((distanceKm / speed) * 60);
}	