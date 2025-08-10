import axios from 'axios';

export async function removeTempJwt(apiBaseUrl: string) {

    axios.post(`${apiBaseUrl}/login/removeTempJwt`,
        {},
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true, 
        }
    )
    .then(res => {
        if (res.status === 204) {
            window.location.href = '/';
        } else {
            alert('...');
        }
    })
    .catch(err => {
        console.error("임시 jwt 제거중 에러 발생:", err);
    });


}