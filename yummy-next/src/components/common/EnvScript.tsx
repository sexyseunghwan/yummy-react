'use client';

export default function EnvScript() {
  const env = {
    api_base_url: process.env.NEXT_PUBLIC_API_BASE_URL,
    public_base_path: process.env.NEXT_PUBLIC_BASE_PATH,
    kakao_client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
    kakao_auth_url: process.env.NEXT_PUBLIC_KAKAO_AUTH_URL,
    kakao_api_url: process.env.NEXT_PUBLIC_KAKAO_API_URL,
    kakao_redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL
  };

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.env = ${JSON.stringify(env)};`,
      }}
    />
  );
}
