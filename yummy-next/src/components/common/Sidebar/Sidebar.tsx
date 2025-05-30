import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SidebarPortalProps, SidebarProps } from './Sidebar.types';
import { useUser } from '@/context/auth/UserContext';
import { logOut } from '@/lib/client/auth/login/logOutHandler';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import CloseIcon from '../Icons/CloseIcon';

const SidebarPortal = ({ 
  children 
}: SidebarPortalProps) => {

  return createPortal(
    <div id="sidebar">
      {children}
    </div>,
    document.body
  );
};

SidebarPortal.displayName = 'SidebarPortal';

const Sidebar = ({ isOpen, onClose, children }: SidebarProps) =>  {
  const { user, isLoading } = useUser();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLoginClick = () => {
    onClose(); 
  };

  return (
    <>
      {/* 오버레이 */}
      <div
        className={cn(
          'fixed inset-0 bg-black bg-opacity-50 z-[1499] transition-opacity duration-300',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* 사이드바 */}
      <aside
        id="sidebar"
        className={cn(
          'fixed top-0 right-[-260px] w-[260px] h-full bg-background',
          'shadow-[-2px_0_10px_rgba(0,0,0,0.2)]',
          'flex flex-col items-center pt-10 px-4',
          'transition-[right] duration-300 ease-in-out z-[1500]',
          isOpen && 'right-0'
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
          aria-label="Close Sidebar"
        >
          <CloseIcon />
        </button>

        <div className="w-full space-y-4 mt-4">
          {!isLoading && user ? (
            <>
              <div className="text-center my-1 flex flex-col items-center">
                {/* 🔽 동그란 프로필 이미지 */}
                <img
                  src={user.userPic}
                  alt="프로필"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 mb-2"
                />
                <p className="font-semibold text-lg">{user.userNm}</p>
              </div>
              <div>
                <button
                  onClick={() => logOut(apiBaseUrl)}
                  className="block w-full text-center py-2 bg-primary text-white rounded"
                >
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <div>
              <Link
                href="/login"
                onClick={handleLoginClick}
                className="block w-full text-center py-2 bg-primary text-white rounded"
              >
                로그인
              </Link>
            </div>
          )}
        </div>
        <div className="w-full mt-4">
          {children}
        </div>
      </aside>
    </>
  );
}

Sidebar.displayName = 'Sidebar';

export { Sidebar, SidebarPortal };


