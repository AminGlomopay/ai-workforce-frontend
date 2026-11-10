import { FC } from 'react';

import { WorkflowsPageHeader } from '../components/workflows-page-header';
import { NewWorkflowForm } from '../components/new-workflow-form';

export const NewWorkflowPage: FC = () => (
  <div className='px-9 py-9'>
    <WorkflowsPageHeader eyebrow='Workflows' title='New workflow' />
    <NewWorkflowForm />
  </div>
);
