import { FC } from 'react';
import { Link, LinkProps } from '@tanstack/react-router';

import { FanOutIcon } from '@/shared/components/public';

interface SidebarNavLinkProps {
  to: LinkProps['to'];
  label: string;
  count: number;
}

export const SidebarNavLink: FC<SidebarNavLinkProps> = ({ to, label, count }) => (
  <Link
    to={to}
    className='text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-md border border-transparent px-2 py-2 text-xs font-medium'
    activeProps={{ className: 'bg-sidebar-accent text-foreground border-border' }}>
    <FanOutIcon className='size-3.5' />
    <span className='flex-1'>{label}</span>
    <span className='text-muted-foreground font-mono text-[10px]'>{count}</span>
  </Link>
);
