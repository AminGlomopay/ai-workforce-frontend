import { FC } from 'react';
import { useParams } from '@tanstack/react-router';

import { WorkflowEditor } from '../components/workflow-editor';

export const WorkflowEditorPage: FC = () => {
  const { workflowId } = useParams({ from: '/_authenticated/workflows/$workflowId' });

  return <WorkflowEditor key={workflowId} workflowId={workflowId} />;
};
