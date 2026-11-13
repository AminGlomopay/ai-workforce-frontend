import { FC } from 'react';
import { Link } from '@tanstack/react-router';

import { ExecutionModeLabel } from './execution-mode-label';
import { ExecutionStatusOrb } from './execution-status-orb';
import { LiveDuration } from './live-duration';
import { ProgressScanLine } from './progress-scan-line';
import { EXECUTION_STATUS_LABELS } from '../constants/workflow-editor.constants';
import { WorkflowExecutionSummary } from '../types/workflow-execution.types';
import { isExecutionBusy } from '../utils/execution-status';

import { cn } from '@/shared/utils/cn';

interface ExecutionListItemProps {
  execution: WorkflowExecutionSummary;
}

export const ExecutionListItem: FC<ExecutionListItemProps> = ({ execution }) => {
  const { id, workflowId, status, mode, startedAt, finishedAt, createdAt, error, workflowVersion, triggeredBy } = execution;
  const isFailed = status === 'FAILED' || status === 'CRASHED';

  return (
    <Link
      to='/workflows/$workflowId/executions/$executionId'
      params={{ workflowId, executionId: id }}
      search
      activeOptions={{ includeSearch: false }}
      className='group hover:bg-primary/5 data-[status=active]:border-primary-soft/40 data-[status=active]:bg-primary/10 data-[status=active]:shadow-primary/25 relative flex gap-3 overflow-hidden rounded-lg border border-transparent px-3 py-2.5 transition-colors data-[status=active]:shadow-[0_0_24px]'>
      <span className='relative flex w-2 justify-center pt-1.5'>
        <span className='bg-primary-soft/15 absolute -top-3 -bottom-3 w-px' />
        <ExecutionStatusOrb status={status} />
      </span>
      <div className='flex min-w-0 flex-1 flex-col gap-1'>
        <div className='flex items-baseline justify-between gap-2'>
          <span className='text-sm font-medium tabular-nums'>
            {new Date(createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
          <span className='text-muted-foreground/70 font-mono text-[10px] tracking-widest uppercase'>#{id.slice(0, 6)}</span>
        </div>
        <div className='text-muted-foreground flex items-center justify-between gap-2 font-mono text-[10px] tracking-widest uppercase'>
          <span className='flex items-center gap-1.5'>
            <span className={cn(isFailed ? 'text-destructive' : 'text-foreground')}>{EXECUTION_STATUS_LABELS[status]}</span>
            {startedAt && status !== 'WAITING' && (
              <>
                · <LiveDuration from={startedAt} to={finishedAt} />
              </>
            )}
          </span>
          <span className='flex items-center gap-1.5'>
            <ExecutionModeLabel mode={mode} />· v{workflowVersion.number}
          </span>
        </div>
        {error && (
          <span className='text-destructive/90 truncate text-xs' title={error.message}>
            {error.nodeName && <span className='text-foreground/80'>{error.nodeName}: </span>}
            {error.message}
          </span>
        )}
        {triggeredBy && <span className='text-muted-foreground/70 truncate text-xs'>Run by {triggeredBy.name}</span>}
      </div>
      {isExecutionBusy(status) && <ProgressScanLine />}
    </Link>
  );
};
