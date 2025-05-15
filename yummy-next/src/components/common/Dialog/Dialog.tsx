import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';
import type { DialogProps } from './Dialog.types';

// 다이얼로그는 모달의 기본이 되는 컴포넌트입니다.
const Dialog = React.memo(({ 
    isOpen, 
    onClose, 
    children, 
    overlayClassName,
    contentClassName,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    ref,
  }: DialogProps) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const mergedRef = (node: HTMLDivElement) => {
      dialogRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      const handleEscKey = (event: KeyboardEvent) => {
        if (closeOnEsc && event.key === 'Escape' && isOpen) {
          onClose?.();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscKey);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscKey);
        document.body.style.overflow = '';
      };
    }, [isOpen, onClose, closeOnEsc]);

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose?.();
      }
    };

    if (!isOpen) return null;

    return createPortal(
      <div 
        className={cn(
          "fixed inset-0 flex items-center justify-center bg-black/50",
          overlayClassName
        )}
        style={{ zIndex: 99999 }}
        onClick={handleOverlayClick}
        aria-modal="true"
        role="dialog"
      >
        <div 
          ref={mergedRef}
          className={cn(
            "relative bg-white rounded-lg shadow-lg",
            contentClassName
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

Dialog.displayName = 'Dialog';

export { Dialog }; 