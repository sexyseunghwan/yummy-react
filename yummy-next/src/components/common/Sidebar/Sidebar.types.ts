export interface SidebarPortalProps extends React.ComponentProps<'div'>{
    children: React.ReactNode;
  }

export interface SidebarProps extends React.ComponentProps<'aside'>{
  isOpen: boolean;
  onClose: () => void;
}