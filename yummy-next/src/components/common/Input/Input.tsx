'use client';

import { cn } from '@/lib/utils';
import { InputProps } from './Input.types';
import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputProps>(({
	className,
	placeholder,
	size = 'medium',
	type = 'text',
	...props
}, ref) => {

    const inputStyle = 'flex items-center w-full h-10 rounded-md border border-accent/40 bg-white text-slate-800 shadow-sm hover:bg-slate-50 transition-all duration-200 outline-none';

	const inputSizes = {
		small: 'px-2 py-2 text-sm rounded-md',
		medium: 'px-2 py-1 rounded-md',
		large: 'px-6 py-6 text-lg rounded-lg'
	}[size];

	return (
		<input
            placeholder={placeholder}
			type={type}
			className={cn(
				inputStyle,
                inputSizes,
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});

Input.displayName = 'Input';

export default Input;
