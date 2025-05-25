'use client';

import Link from 'next/link';
import { ComboBox } from '../ComboBox';
import MenuIcon from '@/components/common/Icons/MenuIcon';
import type { HeaderProps } from './Header.types';
import { useState } from 'react';

const Header = ({ 
	onMenuClick
 }: HeaderProps) => {
	const [selected, setSelected] = useState<string>("");
	return (
		<header className="flex items-center justify-between gap-3 border-b border-accent py-2 px-2 fixed top-0 left-0 w-full z-[999] bg-background">
			<h1><Link href="/">로고</Link></h1>

			<div className="flex flex-1 items-center gap-2">
				<ComboBox 
					selected={selected}
					onChange={(value) => setSelected(value)}
				>
					<ComboBox.Trigger />
					<ComboBox.Content>
						<ComboBox.Item value="맛집 추천">맛집 추천</ComboBox.Item>
						<ComboBox.Item value="카페 추천">카페 추천</ComboBox.Item>
						<ComboBox.Item value="디저트 추천">디저트 추천</ComboBox.Item>
					</ComboBox.Content>
				</ComboBox>
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


