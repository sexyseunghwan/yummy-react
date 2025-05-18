'use client';

import Link from 'next/link';
import { Button } from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import MenuIcon from '@/components/common/Icons/MenuIcon';
import LogoIcon from '@/components/common/Icons/LogoIcon';
import type { HeaderProps } from './Header.types';

const Header = ({ 
	onMenuClick
 }: HeaderProps) => {

	return (
		<header className="flex items-center justify-between gap-3 border-b border-accent py-2 px-2 w-full bg-background">
			<h1><Link href="/"><LogoIcon /></Link></h1>

			<div className="flex flex-1 items-center gap-2 ">
				<Input placeholder="검색할 가게명을 입력하세요." className="bg-white"/>

				<Button variant="primary" size="small" className="rounded-full" onClick={() => {}}>검색</Button>
			</div>

			<button
				type="button"
				className="cursor-pointer" 
				onClick={onMenuClick}
			>
				<MenuIcon />
			</button>
		</header>
	);
}

Header.displayName = 'Header';

export { Header };


