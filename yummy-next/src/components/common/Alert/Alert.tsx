import { cn } from '@/lib/utils';
import * as React from 'react';
import { Button } from '../../../components/common/Button/Button';
import { Dialog } from '../../../components/common/Dialog/Dialog';
import type { AlertProps } from './Alert.types';
import ErrorIcon from '../Icons/ErrorIcon';
import CloseIcon from '../Icons/CloseIcon';
import SuccessIcon from '../Icons/SuccessIcon';
import InfoIcon from '../Icons/InfoIcon';
import NoticeIcon from '../Icons/NoticeIcon';

const Alert = ({
                   variant = 'default',
                   onClose,
                   ref,
                   className,
                   children,
                   isOpen,
                   ...props
               }: AlertProps) => {
    const alertBaseStyle =
        'relative w-full m-10 flex items-center gap-3 rounded-lg border px-5 py-5 shadow-md bg-white';

    const alertVariantStyle = {
        default: 'border-slate-200 text-slate-800 bg-white',
        success: 'border-green-200 bg-green-50 text-green-900',
        error: 'border-red-200 bg-red-50 text-red-900',
        notice: 'border-yellow-200 bg-yellow-50 text-yellow-900',
        info: 'border-blue-200 bg-blue-50 text-blue-900',
    }[variant];

    const alertIcon = {
        default: null,
        success: <SuccessIcon />,
        error: <ErrorIcon />,
        notice: <NoticeIcon />,
        info: <InfoIcon />,
    }[variant];

    return (
        <Dialog
            ref={ref}
            closeOnOverlayClick={false}
            closeOnEsc={false}
            isOpen={isOpen}
            onClose={onClose}
            contentClassName={cn(alertBaseStyle, alertVariantStyle, className)}
            {...props}
        >
            {variant !== 'default' && (
                <div className="shrink-0">{alertIcon}</div>
            )}

            <div className="flex-1 text-left">
                {children}
            </div>

            <Button
                variant="ghost"
                className="absolute top-3 right-3 h-6 w-6 p-0 text-slate-400 hover:text-slate-600 focus:outline-none"
                onClick={onClose}
                aria-label="닫기"
            >
                <CloseIcon />
            </Button>
        </Dialog>
    );
};

Alert.displayName = 'Alert';

const AlertTitle = ({
                        ref,
                        className,
                        children,
                        ...props
                    }: React.ComponentProps<'h2'>) => {
    return (
        <h2
            ref={ref}
            className={cn('text-sm font-semibold leading-snug mb-1', className)}
            {...props}
        >
            {children}
        </h2>
    );
};

AlertTitle.displayName = 'AlertTitle';

const AlertDescription = ({
                              ref,
                              className,
                              children,
                              ...props
                          }: React.ComponentProps<'p'>) => {
    return (
        <p
            ref={ref}
            className={cn('text-sm text-slate-700 leading-snug', className)}
            {...props}
        >
            {children}
        </p>
    );
};

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
