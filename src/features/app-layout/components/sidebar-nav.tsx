import { FC } from 'react';

import { SidebarNavLink } from './sidebar-nav-link';

export const SidebarNav: FC = () => (
  <nav className='mt-8 flex flex-1 flex-col gap-2'>
    <span className='text-muted-foreground px-2 font-mono text-[10px] tracking-widest uppercase'>Workspace</span>
    <SidebarNavLink to='/workflows' label='Workflows' count={0} />
  </nav>
);
