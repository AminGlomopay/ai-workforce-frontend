import { FC } from 'react';

import { WorkflowSummary } from '../types/workflows.types';

import { WorkflowsListStatus } from './workflows-list-status';
import { WorkflowListItem } from './workflow-list-item';

import { CornerMarks } from '@/shared/components/public';

interface WorkflowsListProps {
  workflows: WorkflowSummary[];
}

export const WorkflowsList: FC<WorkflowsListProps> = ({ workflows }) => (
  <section className='bg-grid-glow border-primary/25 relative rounded-xl border p-7'>
    <CornerMarks />
    <WorkflowsListStatus workflows={workflows} />
    <ul className='flex flex-col gap-2'>
      {workflows.map((workflow, index) => (
        <WorkflowListItem key={workflow.id} workflow={workflow} index={index} />
      ))}
    </ul>
  </section>
);
