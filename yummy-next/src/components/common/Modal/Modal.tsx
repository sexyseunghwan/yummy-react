import React from 'react';
import { Button } from '../Button/Button';
import { Dialog } from '../Dialog/Dialog';
import { ModalProps } from './Modal.types';
import { cn } from '@/lib/utils';
import CloseIcon from '../Icons/CloseIcon';

const Modal = React.memo(({
        children,
        title,
        footer,
        width = '50vw',
        height = 'auto',
        closable = true,
        contentClassName,
        headerClassName,
        bodyClassName,
        footerClassName,
        ref,
        ...props
    }: ModalProps) => {
    return (
        <Dialog
            {...props}
            ref={ref}
            closeOnOverlayClick={false}
            contentClassName={cn(
                'max-h-[90vh] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden',
                contentClassName
            )}
        >
            <div
                className="flex flex-col w-full"
                style={{
                    width: typeof width === 'number' ? `${width}px` : width,
                    height: typeof height === 'number' ? `${height}px` : height,
                }}
            >
                {(title || closable) && (
                    <div
                        className={cn(
                            'relative px-4 py-4 md:px-6 md:py-5 border-b border-slate-200 flex',
                            headerClassName
                        )}
                    >
                        {title && (
                            <h2 className="text-base md:text-lg font-semibold text-slate-800 leading-tight">
                                {title}
                            </h2>
                        )}
                        {closable && (
                            <Button
                                variant="ghost"
                                className="absolute top-4 right-3 h-5 w-5 p-0 text-slate-500 hover:text-slate-700 transition-colors"
                                onClick={props.onClose}
                                aria-label="닫기"
                            >
                                <CloseIcon />
                            </Button>
                        )}
                    </div>
                )}

                <div
                    className={cn(
                        'flex-1 overflow-auto px-5 py-4 md:px-6 md:py-5 text-slate-700 text-sm leading-relaxed',
                        bodyClassName
                    )}
                >
                    {children}
                </div>

                {footer && (
                    <div
                        className={cn(
                            'px-5 py-4 md:px-6 md:py-5 border-t border-slate-200 flex justify-end items-center gap-2',
                            footerClassName
                        )}
                    >
                        {footer}
                    </div>
                )}
            </div>
        </Dialog>
    );
});

Modal.displayName = 'Modal';

export { Modal };
