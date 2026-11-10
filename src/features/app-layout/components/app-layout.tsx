import { FC, ReactNode } from 'react';

import { Sidebar } from './sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => (
  <div className='flex min-h-dvh'>
    <Sidebar />
    <main className='min-w-0 flex-1'>{children}</main>
  </div>
);
