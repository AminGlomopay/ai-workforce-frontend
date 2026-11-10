import { FC } from 'react';

import { WorkflowsPageHeader } from '../components/workflows-page-header';
import { WorkflowsEmptyState } from '../components/workflows-empty-state';

export const WorkflowsListPage: FC = () => (
  <div className='px-9 py-9'>
    <WorkflowsPageHeader />
    <WorkflowsEmptyState />
  </div>
);
