import { FC, ReactNode } from 'react';

import { Sidebar } from './sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => (
  <div className='flex min-h-dvh'>
    <Sidebar />
    <main className='flex-1 px-9 py-9'>{children}</main>
  </div>
);
