import { FC } from 'react';
import { toast } from 'sonner';

import { DeactivateWorkflowDialog } from './deactivate-workflow-dialog';
import { EditorTitle } from './editor-title';
import { IssuesErrorPanel } from './issues-error-panel';
import { ProgressScanLine } from './progress-scan-line';
import { PublishButton } from './publish-button';
import { PublishStatus } from './publish-status';
import { RunButton } from './run-button';
import { SaveButton } from './save-button';
import { SavedToast } from './saved-toast';
import { SaveErrorPanel } from './save-error-panel';
import { SaveStatus } from './save-status';
import { SAVED_TOAST_DURATION } from '../constants/workflow-editor.constants';
import { useHasUnsavedChanges } from '../hooks/use-has-unsaved-changes';
import { usePublishWorkflow } from '../hooks/use-publish-workflow';
import { useSaveShortcut } from '../hooks/use-save-shortcut';
import { useSaveWorkflow } from '../hooks/use-save-workflow';
import { useStartExecution } from '../hooks/use-start-execution';
import { useWorkflow } from '../hooks/use-workflow';
import { useWorkflowGraph } from '../hooks/use-workflow-graph';
import { useWorkflowNodeTypes } from '../hooks/use-workflow-node-types';
import { useWorkflowRun } from '../hooks/use-workflow-run';
import { Workflow } from '../types/workflow-editor.types';
import { isExecutionBusy } from '../utils/execution-status';
import { runsOnlyAutomatically } from '../utils/trigger-nodes';

const AUTOMATIC_ONLY_RUN_REASON = 'This workflow runs from its trigger. Publish it, or add a Manual Trigger to test it from the editor.';

interface EditorTopBarProps {
  workflowId: string;
}

export const EditorTopBar: FC<EditorTopBarProps> = ({ workflowId }) => {
  const workflow = useWorkflow(workflowId);
  const graph = useWorkflowGraph();
  const nodeTypes = useWorkflowNodeTypes();
  const hasUnsavedChanges = useHasUnsavedChanges(workflowId, graph);
  const { mutate: save, isPending, error, reset } = useSaveWorkflow(workflowId);
  const { mutate: startRun, isPending: isStarting, error: runError, reset: resetRun } = useStartExecution(workflowId);
  const { mutate: publish, isPending: isPublishing, error: publishError, reset: resetPublish } = usePublishWorkflow(workflowId);
  const { execution, setIssues } = useWorkflowRun();
  const isRunning = isStarting || (execution !== undefined && isExecutionBusy(execution.status));
  const isAutomaticOnly = runsOnlyAutomatically(graph.nodes, nodeTypes);
  const canSave = hasUnsavedChanges && !isPending;
  const canPublish = !isPending && !isPublishing && (hasUnsavedChanges || workflow.activeVersionId !== workflow.version.id);

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

  const dismissRunError = () => {
    resetRun();
    setIssues([]);
  };

  // Runs and publishes act on a saved version, so pending changes are saved first.
  const runGraph = () => {
    resetPublish();
    if (hasUnsavedChanges) saveGraph((saved) => startRun(saved.version.id));
    else startRun(workflow.version.id);
  };

  const publishGraph = () => {
    dismissRunError();
    if (hasUnsavedChanges) saveGraph((saved) => publish(saved.version.id));
    else publish(workflow.version.id);
  };

  useSaveShortcut(() => {
    if (canSave) saveGraph();
  });

  return (
    <header className='animate-in fade-in slide-in-from-top-2 fill-mode-both relative z-10 flex items-center gap-6 border-b px-6 py-3 duration-500'>
      <EditorTitle name={workflow.name} />
      <SaveStatus key={workflow.version.number} isSaving={isPending} hasUnsavedChanges={hasUnsavedChanges} versionNumber={workflow.version.number} />
      <PublishStatus activeVersionId={workflow.activeVersionId} versionId={workflow.version.id} />
      <div className='flex items-center gap-2'>
        {workflow.activeVersionId && <DeactivateWorkflowDialog workflowId={workflowId} workflowName={workflow.name} />}
        <RunButton
          disabled={isPending || isRunning || isAutomaticOnly}
          disabledReason={isAutomaticOnly ? AUTOMATIC_ONLY_RUN_REASON : undefined}
          isRunning={isRunning}
          onClick={runGraph}
        />
        <PublishButton disabled={!canPublish} isPublishing={isPublishing} onClick={publishGraph} />
        <SaveButton disabled={!canSave} isSaving={isPending} onClick={() => saveGraph()} />
      </div>
      {(isPending || isStarting || isPublishing) && <ProgressScanLine />}
      {error && <SaveErrorPanel workflowId={workflowId} error={error} onReloaded={reset} />}
      {runError && <IssuesErrorPanel error={runError} blockedTitle='Run blocked' failedTitle='Run not started' onDismiss={dismissRunError} />}
      {publishError && <IssuesErrorPanel error={publishError} blockedTitle='Publish blocked' failedTitle='Not published' onDismiss={resetPublish} />}
    </header>
  );
};
