import axios from 'axios';
import { cookies } from 'next/headers';

/**
 * 로그인 상태인지 확인해주는 함수
 * @param apiBaseUrl 
 * @returns 
 */
export async function checkLogin(apiBaseUrl: string) {
    

    axios.post(`${apiBaseUrl}/login/auth/loginCheck`,
        {},
        {
            withCredentials: true,
        }
    )
    .then(res => {
        
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    })
    .catch(err => {
        console.error(err);
    }); 
}


/**
 * 로그인 상태인지 확인해주는 함수 - 로그인 탭 누를경우에 호출할 함수
 * @param apiBaseUrl 
 */
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
