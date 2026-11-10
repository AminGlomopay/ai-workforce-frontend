import { FC } from 'react';
import { toast } from 'sonner';

import { EditorTitle } from './editor-title';
import { ProgressScanLine } from './progress-scan-line';
import { RunButton } from './run-button';
import { RunErrorPanel } from './run-error-panel';
import { SaveButton } from './save-button';
import { SavedToast } from './saved-toast';
import { SaveErrorPanel } from './save-error-panel';
import { SaveStatus } from './save-status';
import { SAVED_TOAST_DURATION } from '../constants/workflow-editor.constants';
import { useHasUnsavedChanges } from '../hooks/use-has-unsaved-changes';
import { useSaveShortcut } from '../hooks/use-save-shortcut';
import { useSaveWorkflow } from '../hooks/use-save-workflow';
import { useStartExecution } from '../hooks/use-start-execution';
import { useWorkflow } from '../hooks/use-workflow';
import { useWorkflowGraph } from '../hooks/use-workflow-graph';
import { useWorkflowRun } from '../hooks/use-workflow-run';
import { Workflow } from '../types/workflow-editor.types';
import { isExecutionFinished } from '../utils/execution-status';

interface EditorTopBarProps {
  workflowId: string;
}

export const EditorTopBar: FC<EditorTopBarProps> = ({ workflowId }) => {
  const workflow = useWorkflow(workflowId);
  const graph = useWorkflowGraph();
  const hasUnsavedChanges = useHasUnsavedChanges(workflowId, graph);
  const { mutate: save, isPending, error, reset } = useSaveWorkflow(workflowId);
  const { mutate: startRun, isPending: isStarting, error: runError, reset: resetRun } = useStartExecution(workflowId);
  const { execution, setIssues } = useWorkflowRun();
  const isRunning = isStarting || (execution !== undefined && !isExecutionFinished(execution.status));
  const canSave = hasUnsavedChanges && !isPending;

  const saveGraph = (onSaved?: (saved: Workflow) => void) =>
    save(
      { baseVersionId: workflow.version.id, ...graph },
      {
        onSuccess: (saved) => {
          toast.custom(() => <SavedToast workflow={saved} />, { duration: SAVED_TOAST_DURATION });
          onSaved?.(saved);
        },
      },
    );

  // Runs execute a saved version, so pending changes are saved first.
  const runGraph = () => (hasUnsavedChanges ? saveGraph((saved) => startRun(saved.version.id)) : startRun(workflow.version.id));

  const dismissRunError = () => {
    resetRun();
    setIssues([]);
  };

  useSaveShortcut(() => {
    if (canSave) saveGraph();
  });

  return (
    <header className='animate-in fade-in slide-in-from-top-2 fill-mode-both relative z-10 flex items-center gap-6 border-b px-6 py-3 duration-500'>
      <EditorTitle name={workflow.name} />
      <SaveStatus key={workflow.version.number} isSaving={isPending} hasUnsavedChanges={hasUnsavedChanges} versionNumber={workflow.version.number} />
      <div className='flex items-center gap-2'>
        <RunButton disabled={isPending || isRunning} isRunning={isRunning} onClick={runGraph} />
        <SaveButton disabled={!canSave} isSaving={isPending} onClick={() => saveGraph()} />
      </div>
      {(isPending || isStarting) && <ProgressScanLine />}
      {error && <SaveErrorPanel workflowId={workflowId} error={error} onReloaded={reset} />}
      {runError && <RunErrorPanel error={runError} onDismiss={dismissRunError} />}
    </header>
  );
};
