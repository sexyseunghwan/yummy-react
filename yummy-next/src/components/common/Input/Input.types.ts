export interface InputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
	size?: 'small' | 'medium' | 'large';
    placeholder?: string;
}