import { FC } from 'react';
import { useParams } from '@tanstack/react-router';

import { EditorTopBar } from '../components/editor-top-bar';
import { WorkflowCanvas } from '../components/workflow-canvas';

import { useWorkflow } from '@/features/workflows/public';

export const WorkflowEditorPage: FC = () => {
  const { workflowId } = useParams({ from: '/_authenticated/workflows/$workflowId' });
  const workflow = useWorkflow(workflowId);

  return (
    <div className='flex h-dvh flex-col'>
      <EditorTopBar workflow={workflow} />
      <WorkflowCanvas nodes={workflow.version.nodes} />
    </div>
  );
};
