import axios from 'axios';
import { ChangePasswdForm } from '@/types/client/auth/changePasswd/changePasswdForm';

/**
 * 유저의 비밀번호 변경을 위해서 비밀번호 데이터를 뽑아주는 함수
 * @param form 
 * @returns 
 */
export function extractFormData(form: HTMLFormElement) {
    const userChangePw = (form.elements.namedItem('password') as HTMLInputElement)?.value || '';
    const userChangePwCheck = (form.elements.namedItem('passwordCheck') as HTMLInputElement)?.value || '';

    return {
        userChangePw,
        userChangePwCheck
    }
}

/**
 * 유저의 비밀번호 변경을 위해 api를 호출하는 함수
 * @param formData 
 * @param apiBaseUrl 
 */
export async function validateAndSubmit(formData: ChangePasswdForm, apiBaseUrl: string) {

    const responseMessages: { [key: string]: string } = {
        SUCCESS: "비밀번호가 변경되었습니다. 다시 로그인 해주세요.",
        PW_ERR: "비밀번호를 확인해주세요. 소문자/대문자 1개이상 특수문자 1개이상, 8자리 이상의 조합",
        PW_CHECK_ERR: "비밀번호가 일치하지 않습니다.",
        AUTH_ERROR: "인증되지 않은 토큰을 사용하였습니다.",
        LOGIN_AGAIN: "다시 로그인 해주세요.",
        SERVER_ERR: "비밀번호 변경이 실패하였습니다.",
    }

    axios.post(`${apiBaseUrl}/joinMember/changePw`,
        formData,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }
    )
    .then(res => {
        const code = res.data;
        const message = responseMessages[code];

        if (code === 'SUCCESS') {
            alert(message);
            location.href = "/login"
        } else {
            alert(message);
        }
    })
    .catch(err => {
        console.error("비밀번호 변경 중 에러 발생:", err);
    })
} 