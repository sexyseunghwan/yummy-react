// app/layout.tsx
import './globals.css';
import Script from 'next/script';
import Header from '@/components/common/Header/Header';
import Sidebar from '@/components/common/Sidebar';
import KakaoInit from '@/components/auth/KakaoInit';
import EnvScript from '@/components/common/EnvScript';
import { UserProvider } from '@/context/auth/UserContext';
import {cn} from '@/lib/utils';
import Link from 'next/link';

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
			<link rel="stylesheet" href="/css/common.css" />
			<Script src="/js/common.js" strategy="afterInteractive" />
			<Script
				src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
				integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
				crossOrigin="anonymous"
				strategy="beforeInteractive"
			/>
			</head>
			<body className="min-h-screen flex flex-col">
				<UserProvider>
					<EnvScript />
					<Header />
					<KakaoInit/>
					<Sidebar />
					<main className={cn("flex-1")}>{children}</main>
					<footer className={cn("w-full bg-background text-center py-3 text-xs border-t border-accent")}>
						<p>© 2025 Yummy 초코송이표 정품입니다.</p>
						<p><Link href="" className={cn("text-text-light")}>support@yummymap.com</Link></p>
					</footer>
				</UserProvider>
			</body>
		</html>
	);
}