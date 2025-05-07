import axios from 'axios';
import { LoginParams } from '@/types/login/loginParams';

/**
 * 로그인 처리 함수
 * @param param0 
 */
export async function handleLogin({ userId, userPw, apiBaseUrl }: LoginParams) {

    const payload = { userId, userPw };
    
    axios.post(`${apiBaseUrl}/login/standardLogin`,
        payload,
        {
            withCredentials: true
        }
    )
    .then(res => {
        
        const statusCode = res.data;

        if (statusCode === "SUCCESS") {
            alert("로그인 성공!");
            window.location.href = '/';
        } else {
            alert("아이디/비밀번호를 확인해주세요.");
        }
        
    })
    .catch(err => {
        console.error("로그인 중 에러 발생:", err);
    })
}

/**
 * 키보드를 눌렀을때 동작되는 함수
 * @param apiBaseUrl 
 * @param userId 
 * @param userPw 
 * @returns 
 */
export function createHandleKeyDown(apiBaseUrl: string, userId: string, userPw: string) {
    return (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin({ userId, userPw, apiBaseUrl });
        }
    }
}