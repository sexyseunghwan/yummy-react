import axios from 'axios';
import { LoginParams } from '@/types/client/auth/login/loginParams';


/**
 * Oauth 로 로그인한 유저를 기본 유저정보와 맵핑시키는 함수.
 * @param param0 
 */
export async function linkUserByOauth({userId, userPw, apiBaseUrl}: LoginParams) {
    
    const responseMessages: { [key: string]: string } = {
        SUCCESS: "유저 정보가 성공적으로 연동되었습니다.",
        AUTH_ERROR: "존재하지 않는 유저이거나, 비밀번호가 잘못되었습니다.",
        OAUTH_DUPLICATED: "해당 회원은 이미 유저정보가 연동된 상태입니다.",
        SERVER_ERR: "유저정보 연동에 실패하였습니다.",
        REJOIN_CHECK: "10분이내에 회원가입 연동을 해야 합니다. 재 로그인 해주세요."
    }

    const payload = { userId, userPw };

    axios.post(`${apiBaseUrl}/joinMember/linkUserByOauth`,
        payload,
        { withCredentials: true }
    )
    .then(res => {
        const code = res.data;
        const message = responseMessages[code];

        if (code === 'SUCCESS') {
            alert(message);
            location.href = "/"
        } else if (code === 'REJOIN_CHECK') {
            alert(message);
            location.href = "/"
        } else {
            alert(message);
        }

    })
    .catch(err => {
        console.error("Oauth <-> 유저 정보 연동 중 에러 발생:", err);
    });
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
            linkUserByOauth({ userId, userPw, apiBaseUrl });
        }
    }
}