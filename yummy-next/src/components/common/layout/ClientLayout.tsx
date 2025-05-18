'use client';

import { useState } from 'react';
import { Header } from '@/components/common/Header/Header';
import { Sidebar } from '@/components/common/Sidebar/Sidebar';
import Link from 'next/link';

export default function ClientLayout({ children }: { children?: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <main className="flex-grow relative w-full">{children}</main>

      <footer className="w-full bg-background text-center py-3 text-xs border-t border-accent">
        <p>© 2025 Yummy 초코송이표 정품입니다.</p>
        <p>
          <Link href="" className="text-text-light">
            support@yummymap.com
          </Link>
        </p>
      </footer>
    </div>
  );
}
