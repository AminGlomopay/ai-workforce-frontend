import { FC, Suspense } from 'react';

import { EmptyOutput } from './empty-output';
import { ExecutionStatusOrb } from './execution-status-orb';
import { RunErrorCard } from './run-error-card';
import { RunPhaseBar } from './run-phase-bar';
import { RunDataLoading } from './run-data-loading';
import { RunTimeline } from './run-timeline';
import { TriggerPayload } from './trigger-payload';
import { EXECUTION_STATUS_LABELS } from '../constants/workflow-editor.constants';
import { WorkflowVersion } from '../types/workflow-editor.types';
import { WorkflowExecutionDetail } from '../types/workflow-execution.types';

interface RunSummaryProps {
  execution: WorkflowExecutionDetail;
  version: WorkflowVersion;
}

export const RunSummary: FC<RunSummaryProps> = ({ execution, version }) => {
  const triggerRuns = execution.nodeRuns.filter(({ nodeId }) => nodeId === execution.triggerNodeId);

  return (
    <>
      <header className='flex flex-col gap-4'>
        <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>Run summary</span>
        <div className='flex flex-col gap-1'>
          <h2 className='text-xl font-semibold tracking-tight'>
            Run{' '}
            <span className='from-primary-soft to-primary bg-linear-to-r bg-clip-text font-mono text-transparent'>#{execution.id.slice(0, 6)}</span>
          </h2>
          <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>
            {execution.id} · v{version.number}
          </span>
        </div>
        <div className='text-muted-foreground flex items-center gap-2 border-y py-2 font-mono text-[10px] tracking-widest uppercase'>
          <ExecutionStatusOrb status={execution.status} />
          <span className='text-foreground'>{EXECUTION_STATUS_LABELS[execution.status]}</span>· select a node to read its data
        </div>
      </header>
      {execution.error && <RunErrorCard status={execution.status} error={execution.error} version={version} />}
      <RunPhaseBar execution={execution} />
      <RunTimeline execution={execution} version={version} />
      {triggerRuns.length ? (
        <Suspense fallback={<RunDataLoading />}>
          <TriggerPayload executionId={execution.id} triggerNodeId={execution.triggerNodeId} runs={triggerRuns} />
        </Suspense>
      ) : (
        <EmptyOutput label='Trigger payload' message='The trigger has not run' />
      )}
    </>
  );
};
