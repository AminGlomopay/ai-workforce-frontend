import { FC } from 'react';

import { ExecutionFiltersPanel } from './execution-filters-panel';
import { ExecutionsList } from './executions-list';
import { LiveIndicator } from './live-indicator';

interface ExecutionsSidebarProps {
  workflowId: string;
}

export const ExecutionsSidebar: FC<ExecutionsSidebarProps> = ({ workflowId }) => (
  <aside className='bg-sidebar animate-in fade-in slide-in-from-left-4 fill-mode-both flex w-80 shrink-0 flex-col border-r duration-500'>
    <header className='flex items-center justify-between px-4 pt-5 pb-4'>
      <div className='flex flex-col gap-1'>
        <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>Run history</span>
        <h2 className='text-lg font-semibold tracking-tight'>Runs</h2>
      </div>
      <LiveIndicator />
    </header>
    <ExecutionFiltersPanel />
    <div className='min-h-0 flex-1 overflow-y-auto px-2 pb-2'>
      <ExecutionsList workflowId={workflowId} />
    </div>
  </aside>
);
