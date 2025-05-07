import { ReactNode, Suspense } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>로그인 처리 중...</div>}>
      {children}
    </Suspense>
  );
}