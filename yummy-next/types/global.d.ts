declare global {
  interface GlobalThis {
    env?: {
      api_base_url?: string;
      public_base_path?: string;
      kakao_client_id?: string;
      kakao_auth_url?: string;
      kakao_api_url?: string;
      kakao_redirect_uri?: string;
    };
  }
}

// 반드시 파일 끝에 export {}를 추가해서 모듈로 간주하도록 함
export {};