/**
 * 위치정보 가져와주는 함수
 * @returns 
 */
export async function getGeolocation(): Promise<{ lat: number | null; lng: number | null }> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            alert("이 브라우저는 Geolocation을 지원하지 않습니다.");
            return resolve({ lat: null, lng: null });
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                });
            },
            (error) => {
                if (error.code === 1) {
                alert("위치 정보 사용이 거부되었습니다.");
                } else if (error.code === 2) {
                alert("위치 정보를 찾을 수 없습니다.");
                } else if (error.code === 3) {
                alert("위치 정보 요청이 시간 초과되었습니다.");
                } else {
                alert("알 수 없는 오류가 발생했습니다.");
                }
                resolve({ lat: null, lng: null }); /* 실패 시에도 resolve해서 안전하게 처리 */ 
            }
        );
    });
}