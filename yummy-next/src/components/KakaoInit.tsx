'use client';

import { useEffect, useState } from 'react';

export default function KakaoInit() {
	
	//const [apiBase, setApiBase] = useState<string | undefined>(undefined);
	
	useEffect(() => {
		
		/* 일단 아래와 같이 state 를 사용할 필요는 없음 */
		//setApiBase(globalThis.env?.api_base_url);
		//console.log("KakaoInit > globalThis.env:", globalThis.env.kakao_api_url);

		if (window.Kakao && !window.Kakao.isInitialized()) {
			window.Kakao.init('4a2a51c4104deceb54f805eb34bc4f3d');
			console.log('Kakao SDK 초기화 완료:', window.Kakao.isInitialized());
		}
	}, []);

	return null;
}
