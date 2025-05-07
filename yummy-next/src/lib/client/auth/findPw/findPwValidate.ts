import axios from 'axios';

import { FindPwForm } from '@/types/client/auth/findPw/findPwForm';


export function extractFormData(form: HTMLFormElement) {
    const userNm = (form.elements.namedItem('userNm') as HTMLInputElement)?.value || '';
    const userId = (form.elements.namedItem('userId') as HTMLInputElement)?.value || '';
    const emailId = (form.elements.namedItem('emailId') as HTMLInputElement)?.value || '';
    const emailDomain = (form.elements.namedItem('emailDomain') as HTMLSelectElement)?.value || '';
    const email = emailDomain ? `${emailId}@${emailDomain}` : emailId;
    
    
    return {
        userNm,
        userId,
        email
    };
}

export async function validateAndSubmit(formData: FindPwForm, apiBaseUrl: string) {
    
    const responseMessages: { [key: string]: string } = {
        SUCCESS: "가입 메일로 임시비밀번호를 발송드렸습니다.",
        PW_FIND_ERR: "해당 정보로 회원가입한 이력이 존재하지 않습니다.",
        EMAIL_ERR: "이메일 주소를 확인해주세요.",
        NAME_ERR: "이름을 확인해주세요.",
        ID_ERR: "아이디를 확인해주세요.",
        SERVER_ERR: "아이디 찾기 실패/서버문제"
    };

    axios.post(`${apiBaseUrl}/joinMember/findPw`,
        formData,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
    .then(res => {

        const code = res.data;
        const message = responseMessages[code];

        if (code === "SUCCESS") {
            alert(message);
            location.href = "/login";
        } else {
            alert(message);
        }
        
    })
    .catch(err => {
        console.error("회원가입 중 에러 발생:", err);
    })

}