import { FC } from 'react';
import { Link } from '@tanstack/react-router';

import { WorkflowSummary } from '../types/workflows.types';
import { formatUpdatedAt } from '../utils/format-updated-at';

import { WorkflowStatusBadge } from './workflow-status-badge';

import { FanOutIcon } from '@/shared/components/public';

interface WorkflowListItemProps {
  workflow: WorkflowSummary;
  index: number;
}

export const WorkflowListItem: FC<WorkflowListItemProps> = ({ workflow, index }) => (
  <li className='animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500' style={{ animationDelay: `${index * 60}ms` }}>
    <Link
      to='/workflows/$workflowId'
      params={{ workflowId: workflow.id }}
      className='border-primary/20 bg-background/50 hover:border-primary-soft/50 hover:bg-primary/10 flex items-center gap-4 rounded-lg border px-5 py-4 transition-colors'>
      <span className='bg-secondary text-primary-soft flex size-8 shrink-0 items-center justify-center rounded-md border'>
        <FanOutIcon className='size-4' />
      </span>
      <span className='flex min-w-0 flex-1 flex-col gap-1'>
        <span className='truncate text-sm font-medium'>{workflow.name}</span>
        {workflow.description && <span className='text-muted-foreground truncate text-xs'>{workflow.description}</span>}
      </span>
      <WorkflowStatusBadge activeVersionId={workflow.activeVersionId} />
      <span className='text-muted-foreground w-10 font-mono text-[10px] tracking-widest uppercase'>v{workflow.latestVersion}</span>
      <span className='text-muted-foreground w-44 text-right font-mono text-[10px]'>Updated {formatUpdatedAt(workflow.updatedAt)}</span>
    </Link>
  </li>
);
