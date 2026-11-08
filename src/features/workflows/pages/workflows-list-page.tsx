import { FC } from 'react';

import { WorkflowsPageHeader } from '../components/workflows-page-header';
import { WorkflowsEmptyState } from '../components/workflows-empty-state';

export const WorkflowsListPage: FC = () => (
  <>
    <WorkflowsPageHeader />
    <WorkflowsEmptyState />
  </>
);
