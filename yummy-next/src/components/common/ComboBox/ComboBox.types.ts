export interface ComboBoxProps extends Omit<React.ComponentProps<"div">, 'onChange'>{
    onChange?: (value: string) => void;
    disabled?: boolean; 
    selected?: string;
}

export interface ComboBoxTriggerProps extends React.ComponentProps<"div">{
    placeholder?: string;
    inputClassName?: string;
}

export interface ComboBoxContentProps extends React.ComponentProps<"ul">{
    className?: string;
}

export interface ComboBoxItemProps extends React.HTMLAttributes<HTMLLIElement> {
    value: string;
    isHistory?: boolean;
    disabled?: boolean;
}