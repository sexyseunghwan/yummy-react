export interface ButtonProps extends React.ComponentProps<'button'>{
    variant?: 'primary' | 'secondary' | 'ghost' | 'zeropay';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
}
