
import axios from 'axios';

export async function checkLoginMain(apiBaseUrl: string) {
    try {

        axios.post(`${apiBaseUrl}/login/auth/loginCheck`,
            {},
            {
                withCredentials: true,
            }
        )
        .then(res => {
            const data = res.data;

            if (data.code === 'AUTH_ERROR') {
                /* 로그인이 안된 경우 */
                window.location.href = '/login';
            } else {
                /* 로그인이 된 경우 */
                window.location.href = '/';
            }
        })

    } catch (err) {
        window.location.href = '/login';
    }
}