import axios from 'axios';

/**
 * 로그아웃 함수
 * @param apiBaseUrl
 */
export async function logOut(apiBaseUrl: string) {

    axios.post(`${apiBaseUrl}/login/standardLogout`,
        {},
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true, 
        }
    )
    .then(res => {
        if (res.status === 204) {
            alert("로그아웃 성공");
            window.location.href = '/';
        } else {
            alert('로그아웃에 실패하였습니다.');
        }
    })
    .catch(err => {
        console.error("로그아웃 중 에러 발생:", err);
    }); 

}