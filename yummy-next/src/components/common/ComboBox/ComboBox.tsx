import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { cn } from '@/lib/utils';
import type { 
    ComboBoxProps,
    ComboBoxTriggerProps,
    ComboBoxContentProps,
    ComboBoxItemProps,
 } from "./ComboBox.types";
 import SearchIcon from "../Icons/ComboBox_Search";
 import ClockIcon from "../Icons/ComboBox_Clock";

interface ComboBoxContextProps{
    disabled: boolean;
    isSelected: boolean;
    setIsSelected: (value: boolean) => void;
    selectedValue: string;
    toggleValue: (value: string) => void;
    inputValue: string;
    setInputValue: (value: string) => void;
    searchHistory: string[];
}

const ComboBoxContext = createContext<ComboBoxContextProps | undefined>(undefined);

const ComboBox = ({
    disabled = false,
    selected,
    onChange,
    className,
    children,
    ...props
}: ComboBoxProps) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [inputValue, setInputValue] = useState("");
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const isControlled = selected !== undefined;
    const currentSelected = isControlled ? selected : selectedValue;
    const comboBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedHistory = localStorage.getItem('searchHistory');
        if (savedHistory) {
            setSearchHistory(JSON.parse(savedHistory));
        }
    }, []);

    const toggleValue = (value: string) => {
        if (!isControlled) {
            setSelectedValue(value);
        }
        if (onChange) {
            onChange(value);
        }
        if (value) {
            const newHistory = [value, ...searchHistory.filter(item => item !== value)].slice(0, 5);
            setSearchHistory(newHistory);
            localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        }
        setIsSelectOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (comboBoxRef.current && !comboBoxRef.current.contains(event.target as Node)) {
                setIsSelectOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <ComboBoxContext.Provider
            value={{
                isSelected: isSelectOpen,
                setIsSelected: setIsSelectOpen,
                toggleValue,
                selectedValue: currentSelected,
                disabled,
                inputValue,
                setInputValue,
                searchHistory,
            }}
        >
            <div
                ref={comboBoxRef}
                aria-expanded={isSelectOpen}
                aria-haspopup="listbox"
                aria-controls="listbox"
                className={cn("relative inline-block w-full", className)}
                {...props}
            >
                {children}
            </div>
        </ComboBoxContext.Provider>
    )
}

ComboBox.displayName = "ComboBox";

const ComboBoxTrigger = ({
    placeholder = "입력하세요.",
    inputClassName,
    className,
    ...props
}: ComboBoxTriggerProps) => {
    const context = useContext(ComboBoxContext);

    if (!context) {
      throw new Error("ComboBoxTrigger ComboBox 구성 요소 내에서 사용해야 합니다. <ComboBox.Trigger>이 <ComboBox> 구성 요소 내부에 중첩되어 있는지 확인하세요.");
    }
  
    const { isSelected, setIsSelected, selectedValue, disabled, inputValue, setInputValue } = context;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!disabled) {
            setIsSelected(!isSelected);
        }
    };

    React.useEffect(() => {
        if (selectedValue) {
            setInputValue(selectedValue);
        }
    }, [selectedValue, setInputValue]);

    return (
        <div
            onClick={handleClick}
            className={cn(
                "flex items-center w-full h-10 rounded-md border border-accent/40 bg-white text-slate-800 shadow-sm hover:bg-slate-50 transition-all duration-200",
                disabled && "bg-slate-100 cursor-not-allowed text-slate-400",
                className
            )}
            {...props}
        >
            <div className="flex-1 px-3 py-2">
                <div className="flex items-center gap-2">    
                    <SearchIcon/>
                    <input
                        type="text"
                        role="combobox"
                        aria-expanded={isSelected}
                        aria-controls="listbox"
                        aria-autocomplete="list"
                        className={cn(
                            "w-full outline-none placeholder-slate-400 bg-transparent text-sm",
                            disabled && "cursor-not-allowed",
                            inputClassName
                        )}
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

ComboBoxTrigger.displayName = "ComboBoxTrigger";

const ComboBoxContent = ({
    className,
    children,
    ...props
}: ComboBoxContentProps) => { 

    const context = useContext(ComboBoxContext);

    if(!context) {
        throw new Error("ComboBoxContent는 Dropdown 구성 요소 내에서 사용해야 합니다. <ComboBox.Content>가 <ComboBox> 구성 요소 내부에 중첩되어 있는지 확인하세요.")
    }

    const { isSelected, inputValue, searchHistory } = context;

    if (!isSelected) return null;

    const filteredChildren = React.Children.toArray(children).filter((child) => {
        if (React.isValidElement(child) && inputValue) {
            const childProps = child.props as ComboBoxItemProps;
            return childProps.children?.toString().toLowerCase().includes(inputValue.toLowerCase());
        }
        return true;
    });

    return(
        <ul
            role="listbox"
            id="listbox"
            aria-label="선택 목록"
            className={cn(
                "absolute top-full mt-1 z-50 w-full max-h-48 overflow-y-auto rounded-md border border-slate-200 bg-white shadow-md p-2 text-sm transition",
                className
            )}
            {...props}
        >
            {searchHistory.length > 0 && (
                <>
                    {searchHistory.map((item, index) => (
                        <ComboBoxItem
                            key={`history-${index}`}
                            value={item}
                            isHistory
                        >
                            {item}
                        </ComboBoxItem>
                    ))}
                </>
            )}
            {filteredChildren.length > 0 && (
                <>
                    {filteredChildren}
                </>
            )}
            {filteredChildren.length === 0 && searchHistory.length === 0 && (
                <li className="text-slate-400 px-2 py-1">검색 결과가 없습니다.</li>
            )}
        </ul>
    );
};

ComboBoxContent.displayName = "ComboBoxContent";

const ComboBoxItem = ({
    value,
    className,
    children,
    isHistory,
    ...props
}: ComboBoxItemProps) => {
    const context = useContext(ComboBoxContext);
    if(!context) {
        throw new Error("ComboBoxItem은 ComboBox 구성 요소 내에서 사용해야 합니다. <ComboBox.Item>이 <ComboBox> 구성 요소 내부에 중첩되어 있는지 확인하세요.")
    }

    const { selectedValue, toggleValue } = context;

    const isItemSelected = selectedValue.includes(value);

    const onItemChange = () => {
        toggleValue(value);          
    };

    return (
        <li
            role="option"
            aria-selected={isItemSelected}
            value={value}
            onClick={onItemChange}
            className={cn(
                "flex items-center gap-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 px-2 py-1 rounded-md transition-colors cursor-pointer",
                isItemSelected && "text-blue-600 font-medium",
                className
            )}
            {...props}
        >
            <span className="text-slate-400">
                {isHistory ? (
                    <ClockIcon/>
                ) : (
                    <SearchIcon/>
                )}
            </span>
            {children}
        </li>
    )
}

ComboBoxItem.displayName = "ComboBoxItem";

export { ComboBox, ComboBoxTrigger, ComboBoxContent, ComboBoxItem };