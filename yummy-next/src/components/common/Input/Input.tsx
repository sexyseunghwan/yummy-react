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

    const inputStyle = 'w-full outline-none transition-colors border border-accent bg-background text-text focus:border-primary disabled:cursor-not-allowed disabled:opacity-50';

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
