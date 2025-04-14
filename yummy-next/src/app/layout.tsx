// app/layout.tsx
import './globals.css';
import Script from 'next/script';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import KakaoInit from '@/components/KakaoInit';
import EnvScript from '@/components/EnvScript';

export const metadata = {
  title: '가야 할 지도',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ko">
			<head>
			<link rel="stylesheet" href="/yummy/css/common.css" />
			<Script src="/yummy/js/common.js" strategy="afterInteractive" />
			<Script
				src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
				integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
				crossOrigin="anonymous"
				strategy="beforeInteractive"
			/>
			</head>
			<body>
			<EnvScript />
			<Header />
			<KakaoInit/>
			<Sidebar />
			<main>{children}</main>
			<footer>
				<p className="copyright">© 2025 Yummy 🍫 초코송이가 만들었어요! 🍄</p>
				<p><a href="">support@yummymap.com</a></p>
			</footer>
			</body>
		</html>
	);
}
