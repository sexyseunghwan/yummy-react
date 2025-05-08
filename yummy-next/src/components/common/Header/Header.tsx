'use client';

import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import MenuIcon from '@/components/common/Icons/MenuIcon';

export default function Header() {
	
	const toggleSidebar = () => {
		const sidebar = document.getElementById('sidebar');
		sidebar?.classList.toggle('active');
	};

	return (
		<header className="flex items-center justify-between border-b border-accent py-2 px-2 fixed top-0 left-0 w-full z-[999] bg-background">
			<h1><Link href="/">로고</Link></h1>

			<div className="flex items-center gap-2">
				<Input placeholder="검색할 가게명을 입력하세요."/>

				<Button variant="primary" size="small" className="rounded-full" onClick={() => {}}>검색</Button>
			</div>

			<div 
				className="cursor-pointer" 
				onClick={toggleSidebar}
			>
				<MenuIcon />
			</div>
		</header>
	);
}
