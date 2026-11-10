import { FC } from 'react';

import { EditorTitle } from './editor-title';
import { SaveButton } from './save-button';
import { SaveErrorPanel } from './save-error-panel';
import { SaveStatus } from './save-status';
import { useHasUnsavedChanges } from '../hooks/use-has-unsaved-changes';
import { useSaveShortcut } from '../hooks/use-save-shortcut';
import { useSaveWorkflow } from '../hooks/use-save-workflow';
import { useWorkflow } from '../hooks/use-workflow';
import { useWorkflowGraph } from '../hooks/use-workflow-graph';

interface EditorTopBarProps {
  workflowId: string;
}

export const EditorTopBar: FC<EditorTopBarProps> = ({ workflowId }) => {
  const workflow = useWorkflow(workflowId);
  const graph = useWorkflowGraph();
  const hasUnsavedChanges = useHasUnsavedChanges(workflowId, graph);
  const { mutate: save, isPending, error, reset } = useSaveWorkflow(workflowId);
  const canSave = hasUnsavedChanges && !isPending;

  const saveGraph = () => {
    if (canSave) save({ baseVersionId: workflow.version.id, ...graph });
  };
  useSaveShortcut(saveGraph);

  return (
    <header className='animate-in fade-in slide-in-from-top-2 fill-mode-both relative z-10 flex items-center gap-6 border-b px-6 py-3 duration-500'>
      <EditorTitle name={workflow.name} />
      <SaveStatus isSaving={isPending} hasUnsavedChanges={hasUnsavedChanges} versionNumber={workflow.version.number} />
      <SaveButton disabled={!canSave} onClick={saveGraph} />
      {error && <SaveErrorPanel workflowId={workflowId} error={error} onReloaded={reset} />}
    </header>
  );
};
