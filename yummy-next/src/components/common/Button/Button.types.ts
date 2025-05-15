export interface ButtonProps extends React.ComponentProps<'button'>{
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
}
