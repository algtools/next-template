import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline';
	size?: 'sm' | 'md' | 'lg';
	children: React.ReactNode;
}

const variants = {
	primary: 'bg-blue-600 hover:bg-blue-700 text-white',
	secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
	outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
};

const sizes = {
	sm: 'px-3 py-1.5 text-sm',
	md: 'px-4 py-2 text-base',
	lg: 'px-6 py-3 text-lg',
};

export function Button({
	variant = 'primary',
	size = 'md',
	children,
	className = '',
	...props
}: ButtonProps) {
	return (
		<button
			className={`rounded-md font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
