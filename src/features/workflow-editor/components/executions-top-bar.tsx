import { FC } from 'react';

import { EditorTitle } from './editor-title';
import { PublishStatus } from './publish-status';
import { WorkflowViewTabs } from './workflow-view-tabs';
import { useWorkflow } from '../hooks/use-workflow';

interface ExecutionsTopBarProps {
  workflowId: string;
}

export const ExecutionsTopBar: FC<ExecutionsTopBarProps> = ({ workflowId }) => {
  const workflow = useWorkflow(workflowId);

  return (
    <header className='animate-in fade-in slide-in-from-top-2 fill-mode-both relative z-10 flex items-center gap-6 border-b px-6 py-3 duration-500'>
      <EditorTitle name={workflow.name} />
      <WorkflowViewTabs workflowId={workflowId} />
      <PublishStatus activeVersionId={workflow.activeVersionId} versionId={workflow.version.id} />
    </header>
  );
};
