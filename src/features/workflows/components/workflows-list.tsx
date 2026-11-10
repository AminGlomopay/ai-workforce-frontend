import { FC } from 'react';

import { WorkflowListItem } from './workflow-list-item';
import { WorkflowSummary } from '../types/workflows.types';

interface WorkflowsListProps {
  workflows: WorkflowSummary[];
}

export const WorkflowsList: FC<WorkflowsListProps> = ({ workflows }) => (
  <ul className='flex flex-col gap-2'>
    {workflows.map((workflow, index) => (
      <li
        key={workflow.id}
        className='animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500'
        style={{ animationDelay: `${index * 60}ms` }}>
        <WorkflowListItem workflow={workflow} />
      </li>
    ))}
  </ul>
);
