import { FC } from 'react';

import { WorkflowsPageHeader } from '../components/workflows-page-header';
import { WorkflowsEmptyState } from '../components/workflows-empty-state';
import { WorkflowsList } from '../components/workflows-list';
import { NewWorkflowButton } from '../components/new-workflow-button';
import { useWorkflows } from '../hooks/use-workflows';

export const WorkflowsListPage: FC = () => {
  const workflows = useWorkflows();

  return (
    <div className='px-9 py-9'>
      <WorkflowsPageHeader>{workflows.length > 0 && <NewWorkflowButton />}</WorkflowsPageHeader>
      {workflows.length > 0 ? <WorkflowsList workflows={workflows} /> : <WorkflowsEmptyState />}
    </div>
  );
};
