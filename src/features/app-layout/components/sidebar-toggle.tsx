import { FC } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

import { SIDEBAR_LABEL_CLASS } from '../constants/app-layout.constants';

import { Button } from '@/shared/components/ui/button';

interface SidebarToggleProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const SidebarToggle: FC<SidebarToggleProps> = ({ collapsed, onToggle }) => (
  <Button
    variant='ghost'
    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    onClick={onToggle}
    className='text-muted-foreground mb-3 h-auto justify-start gap-2 px-2 py-2 text-xs font-medium'>
    <span className='flex size-6 shrink-0 items-center justify-center'>{collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}</span>
    <span className={SIDEBAR_LABEL_CLASS}>Collapse</span>
  </Button>
);
