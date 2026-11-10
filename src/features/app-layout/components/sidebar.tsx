import { FC } from 'react';

import { useSidebarCollapsed } from '../hooks/use-sidebar-collapsed';

import { SidebarBrand } from './sidebar-brand';
import { SidebarNav } from './sidebar-nav';
import { SidebarToggle } from './sidebar-toggle';
import { SidebarUser } from './sidebar-user';

export const Sidebar: FC = () => {
  const { collapsed, toggleCollapsed } = useSidebarCollapsed();

  return (
    <aside
      data-collapsed={collapsed}
      className='group/sidebar bg-sidebar flex w-60 shrink-0 flex-col overflow-hidden border-r px-3 py-5 transition-[width] duration-300 ease-out data-[collapsed=true]:w-16'>
      <SidebarBrand />
      <SidebarNav />
      <SidebarToggle collapsed={collapsed} onToggle={toggleCollapsed} />
      <SidebarUser />
    </aside>
  );
};
