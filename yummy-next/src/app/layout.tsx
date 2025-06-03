import './globals.css';
import Script from 'next/script';
import KakaoInit from '@/components/auth/KakaoInit';
import EnvScript from '@/components/common/EnvScript';
import { UserProvider } from '@/context/auth/UserContext';
import ClientLayout from '@/components/common/layout/ClientLayout';

export const metadata = {
  title: 'Yummy Map',
  description: '맛집 지도 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <Script src="/js/common.js" strategy="afterInteractive" />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-screen">
        <UserProvider>
          <EnvScript />
          <KakaoInit />
          <ClientLayout>{children}</ClientLayout>
        </UserProvider>
      </body>
    </html>
  );
}
