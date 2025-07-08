import type { ButtonProps } from "./Button.types";
import { cn } from "@/lib/utils";

const Button = ({
        variant = 'primary',
        size = 'medium',
        disabled = false,
        className,
        children,
        ...props
    }: ButtonProps) => {

        const buttonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled) {
                e.preventDefault();
                return;
            }
            props.onClick?.(e);
        }

        const buttonStyle = 'flex shrink-0 items-center justify-center text-white disabled:cursor-not-allowed disabled:bg-gray-300';
        const buttonSize = {
            small: "px-2 py-1 text-sm rounded-md",
            medium: "px-4 py-2 text-base rounded-md",
            large: "px-6 py-4 text-lg rounded-lg",
        }[size];
        const buttonVariant = {
            primary: "bg-primary hover:bg-primary-dark",
            secondary: "bg-secondary hover:bg-secondary-dark",
            ghost: "bg-transparent hover:bg-slate-100",
            zeropay: "bg-white border-2 border-green-700 text-black hover:bg-green-50"
        }[variant];
    return (
        <button
            onClick={buttonClick}
            disabled={disabled}
            className={cn(
                buttonStyle,
                buttonVariant,
                buttonSize,
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}

Button.displayName = 'Button';
export { Button };



