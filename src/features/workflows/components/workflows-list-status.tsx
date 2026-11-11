import { FC } from 'react';

import { WorkflowSummary } from '../types/workflows.types';

interface WorkflowsListStatusProps {
  workflows: WorkflowSummary[];
}

export const WorkflowsListStatus: FC<WorkflowsListStatusProps> = ({ workflows }) => (
  <div className='text-muted-foreground mb-5 flex justify-between font-mono text-[10px] tracking-widest uppercase'>
    <span className='flex items-center gap-2'>
      <span className='bg-primary-soft size-1.5 rounded-full' />
      {workflows.length} {workflows.length === 1 ? 'workflow' : 'workflows'}
    </span>
    <span>{workflows.filter((workflow) => workflow.activeVersionId).length} published</span>
  </div>
);
