
import axios from 'axios';
import { FindIdForm } from '@/types/client/auth/findId/findIdForm';

export function extractFormData(form: HTMLFormElement) {
    const userNm = (form.elements.namedItem('userNm') as HTMLInputElement)?.value || '';
    const telecom = (form.elements.namedItem('telecom') as HTMLSelectElement)?.value || '';
    const phoneNumber = (form.elements.namedItem('phoneNumber') as HTMLInputElement)?.value || '';
    const emailId = (form.elements.namedItem('emailId') as HTMLInputElement)?.value || '';
    const emailDomain = (form.elements.namedItem('emailDomain') as HTMLSelectElement)?.value || '';
    const email = emailDomain ? `${emailId}@${emailDomain}` : emailId;
    
    
    return {
        userNm,
        telecom,
        phoneNumber,
        email
    };
}


export async function validateAndSubmit(formData: FindIdForm, apiBaseUrl: string) {
    
    const responseMessages: { [key: string]: string } = {
        SUCCESS: "가입 메일로 아이디정보를 발송드렸습니다.",
        ID_FIND_ERR: "해당 정보로 회원가입한 이력이 존재하지 않습니다.",
        EMAIL_ERR: "이메일 주소를 확인해주세요.",
        NAME_ERR: "이름을 확인해주세요.",
        TELECOM_ERR: "통신사를 선택해주세요.",
        PHONE_ERR: "휴대전화번호를 확인해주세요.",
        SERVER_ERR: "아이디 찾기 실패/서버문제"
    };

    axios.post(`${apiBaseUrl}/joinMember/findId`,
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
        
        console.log(code);

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