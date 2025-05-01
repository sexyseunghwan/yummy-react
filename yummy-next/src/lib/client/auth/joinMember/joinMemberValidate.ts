import { JoinMemberForm } from '@/types/client/auth/joinMember/joinMemberForm';
import axios from 'axios';
import { useState } from 'react';


/**
 * 회원가입 입력 필드에서 값 추출
 * @param form 
 * @param gender 
 * @returns 
 */
export function extractFormData(form: HTMLFormElement, gender: string) {
    const userId = (form.elements.namedItem('userId') as HTMLInputElement)?.value || '';
    const password = (form.elements.namedItem('password') as HTMLInputElement)?.value || '';
    const emailId = (form.elements.namedItem('emailId') as HTMLInputElement)?.value || '';
    const emailDomain = (form.elements.namedItem('emailDomain') as HTMLSelectElement)?.value || '';
    const email = emailDomain ? `${emailId}@${emailDomain}` : emailId;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const birthDate = (form.elements.namedItem('birthDate') as HTMLInputElement)?.value || '';
    const telecom = (form.elements.namedItem('telecom') as HTMLSelectElement)?.value || '';
    const phoneNumber = (form.elements.namedItem('phoneNumber') as HTMLInputElement)?.value || '';

    return {
        userId,
        password,
        email,
        name,
        birthDate,
        telecom,
        gender,
        phoneNumber,
    };
}


/**
 * 회원가입 해줄 api 함수
 * @param formData 
 * @param apiBaseUrl 
 */
export async function validateAndSubmit(formData: JoinMemberForm, apiBaseUrl: string) {
    
    const responseMessages: { [key: string]: string } = {
        SUCCESS: "회원가입이 완료되었습니다.",
        ID_DUPLICATED: "이미 존재하는 아이디입니다.",
        ID_ERR: "사용할 수 없는 아이디입니다. 영문소문자 2개이상 숫자 2개이상의 조합.",
        PW_ERR: "비밀번호를 확인해주세요. 소문자/대문자 1개이상 특수문자 1개이상, 8자리 이상의 조합",
        EMAIL_ERR: "이메일 주소를 확인해주세요.",
        NAME_ERR: "이름을 확인해주세요.",
        BIRTH_ERR: "올바르지 않은 날짜입니다. (ex. 19930823)",
        TELECOM_ERR: "통신사를 선택해주세요.",
        GENDER_ERR: "성별을 선택해주세요.",
        PHONE_ERR: "휴대전화번호를 확인해주세요.",
        SERVER_ERR: "회원가입 실패/서버문제"
    };

    axios.post(`${apiBaseUrl}/joinMember/join`,
        formData,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
    .then(res => {
             
        const code = res.data.code;
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
  