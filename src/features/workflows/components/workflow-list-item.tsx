import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';

import { WorkflowSummary } from '../types/workflows.types';

interface WorkflowListItemProps {
  workflow: WorkflowSummary;
}

export const WorkflowListItem: FC<WorkflowListItemProps> = ({ workflow }) => (
  <Link
    to='/workflows/$workflowId'
    params={{ workflowId: workflow.id }}
    className='group hover:border-primary-soft/40 hover:bg-primary/5 flex items-center gap-4 rounded-lg border px-5 py-4 transition-colors'>
    <span className={workflow.activeVersionId ? 'bg-primary-soft size-1.5 rounded-full' : 'bg-muted-foreground/40 size-1.5 rounded-full'} />
    <div className='flex flex-1 flex-col gap-1'>
      <span className='text-sm font-medium'>{workflow.name}</span>
      <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>
        {workflow.activeVersionId ? 'Published' : 'Not published'} · v{workflow.latestVersion} · Updated{' '}
        {new Date(workflow.updatedAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
      </span>
    </div>
    <ChevronRight className='text-muted-foreground group-hover:text-primary-soft size-4 transition-colors' />
  </Link>
);
