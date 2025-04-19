import { JoinMemberForm } from '@/types/joinMember/joinMemberForm';
import axios from 'axios';

/**
 * 회원가입 해줄 api 함수
 * @param formData 
 * @param apiBaseUrl 
 */
export async function validateAndSubmit(formData: JoinMemberForm, apiBaseUrl: string) {
    
    const responseMessages: { [key: string]: string } = {
        SUCCESS: "회원가입이 완료되었습니다.",
        ID_ERR: "사용할 수 없는 아이디입니다.",
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

        if (message) {
            alert(message);
        } else {
            alert("회원가입 실패.");
        }

    })
    .catch(err => {
        console.error("회원가입 중 에러 발생:", err);
    })

}
  