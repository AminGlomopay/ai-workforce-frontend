import { FC } from 'react';

import { SidebarBrand } from './sidebar-brand';
import { SidebarNav } from './sidebar-nav';
import { SidebarUser } from './sidebar-user';

export const Sidebar: FC = () => (
  <aside className='bg-sidebar flex w-60 shrink-0 flex-col border-r px-3 py-5'>
    <SidebarBrand />
    <SidebarNav />
    <SidebarUser />
  </aside>
);
