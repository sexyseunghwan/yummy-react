import type { DialogProps } from '../../../components/common/Dialog/Dialog.types';

export interface AlertProps extends DialogProps {
    variant?: 'default' | 'success' | 'error' | 'notice' | 'info';
    className?: string;
}