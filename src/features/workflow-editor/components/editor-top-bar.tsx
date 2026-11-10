import { FC } from 'react';
import { toast } from 'sonner';

import { EditorTitle } from './editor-title';
import { SaveButton } from './save-button';
import { SavedToast } from './saved-toast';
import { SaveErrorPanel } from './save-error-panel';
import { SaveProgressLine } from './save-progress-line';
import { SaveStatus } from './save-status';
import { SAVED_TOAST_DURATION } from '../constants/workflow-editor.constants';
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
    if (!canSave) return;
    save(
      { baseVersionId: workflow.version.id, ...graph },
      { onSuccess: (saved) => toast.custom(() => <SavedToast workflow={saved} />, { duration: SAVED_TOAST_DURATION }) },
    );
  };
  useSaveShortcut(saveGraph);

  return (
    <header className='animate-in fade-in slide-in-from-top-2 fill-mode-both relative z-10 flex items-center gap-6 border-b px-6 py-3 duration-500'>
      <EditorTitle name={workflow.name} />
      <SaveStatus key={workflow.version.number} isSaving={isPending} hasUnsavedChanges={hasUnsavedChanges} versionNumber={workflow.version.number} />
      <SaveButton disabled={!canSave} isSaving={isPending} onClick={saveGraph} />
      {isPending && <SaveProgressLine />}
      {error && <SaveErrorPanel workflowId={workflowId} error={error} onReloaded={reset} />}
    </header>
  );
};
