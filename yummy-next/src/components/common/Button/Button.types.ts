export interface ButtonProps extends React.ComponentProps<'button'>{
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
}
