import { FC } from 'react';
import { useParams } from '@tanstack/react-router';
import { ReactFlowProvider } from '@xyflow/react';

import { ReplayCanvas } from '../components/replay-canvas';
import { ReplaySidePanel } from '../components/replay-side-panel';
import { useExecution } from '../hooks/use-execution';
import { useWorkflowVersion } from '../hooks/use-workflow-version';
import { ExecutionReplayProvider } from '../providers/execution-replay.provider';

// Keyed by run so switching runs resets the selection and viewport and replays the entrance.
export const ExecutionReplayPage: FC = () => {
  const { workflowId, executionId } = useParams({ from: '/_authenticated/workflows/$workflowId/executions/$executionId' });
  const execution = useExecution(executionId);
  const version = useWorkflowVersion(workflowId, execution.workflowVersionId);

  return (
    <ExecutionReplayProvider execution={execution}>
      <ReactFlowProvider key={executionId}>
        <ReplayCanvas execution={execution} version={version} />
        <ReplaySidePanel execution={execution} version={version} />
      </ReactFlowProvider>
    </ExecutionReplayProvider>
  );
};
