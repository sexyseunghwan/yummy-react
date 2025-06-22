'use client';

import Link from 'next/link';
import Input from '../Input/Input';
import MenuIcon from '@/components/common/Icons/MenuIcon';
import LogoIcon from '@/components/common/Icons/LogoIcon';
import type { HeaderProps } from './Header.types';

const Header = ({ 
	onMenuClick
 }: HeaderProps) => {
	return (
		<header className="flex items-center justify-between gap-3 border-b border-accent py-2 px-2 w-full bg-background">
			<h1><Link href="/"><LogoIcon /></Link></h1>

			<div className="flex flex-1 items-center gap-2">
				<Link href="/search">
					<Input 
						placeholder="검색어를 입력해주세요."
						size="small"
						readOnly
					/>
				</Link>
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
