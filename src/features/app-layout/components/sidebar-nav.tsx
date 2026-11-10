import { FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { SIDEBAR_LABEL_CLASS } from '../constants/app-layout.constants';

import { SidebarNavLink } from './sidebar-nav-link';

import { workflowsQueryOptions } from '@/features/workflows/public';

export const SidebarNav: FC = () => {
  const { workflows } = useSuspenseQuery(workflowsQueryOptions).data;

  return (
    <nav className='mt-8 flex flex-1 flex-col gap-2'>
      <span className={`text-muted-foreground px-2 font-mono text-[10px] tracking-widest uppercase ${SIDEBAR_LABEL_CLASS}`}>Workspace</span>
      <SidebarNavLink to='/workflows' label='Workflows' count={workflows.length} />
    </nav>
  );
};
