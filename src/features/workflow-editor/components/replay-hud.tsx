import { FC } from 'react';

import { ExecutionModeLabel } from './execution-mode-label';
import { ExecutionStatusOrb } from './execution-status-orb';
import { LiveDuration } from './live-duration';
import { ProgressScanLine } from './progress-scan-line';
import { EXECUTION_STATUS_LABELS } from '../constants/workflow-editor.constants';
import { WorkflowVersion } from '../types/workflow-editor.types';
import { WorkflowExecutionDetail } from '../types/workflow-execution.types';
import { isExecutionBusy } from '../utils/execution-status';

import { cn } from '@/shared/utils/cn';

interface ReplayHudProps {
  execution: WorkflowExecutionDetail;
  version: WorkflowVersion;
  latestVersion: number;
}

export const ReplayHud: FC<ReplayHudProps> = ({ execution, version, latestVersion }) => {
  const { status, mode, createdAt, startedAt, finishedAt } = execution;

  return (
    <div className='bg-popover/80 border-primary-soft/25 shadow-primary/30 animate-in fade-in slide-in-from-top-2 absolute top-4 left-1/2 z-10 flex max-w-[90%] -translate-x-1/2 items-center gap-3 overflow-hidden rounded-full border py-1.5 pr-4 pl-1.5 shadow-[0_0_32px] backdrop-blur-xl duration-500'>
      <span className='bg-primary/25 text-primary-soft border-primary-soft/30 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase'>
        Replay
      </span>
      <span className='text-muted-foreground flex items-center gap-2 font-mono text-[10px] tracking-widest whitespace-nowrap uppercase'>
        <ExecutionStatusOrb status={status} />
        <span className={cn(status === 'FAILED' || status === 'CRASHED' ? 'text-destructive' : 'text-foreground')}>
          {EXECUTION_STATUS_LABELS[status]}
        </span>
        · {new Date(createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'medium' })}
        {startedAt && (
          <>
            · <LiveDuration from={startedAt} to={finishedAt} />
          </>
        )}
        · <ExecutionModeLabel mode={mode} />· v{version.number}
        {version.number !== latestVersion && <span className='text-primary-soft'>· editor at v{latestVersion}</span>}
      </span>
      {isExecutionBusy(status) && <ProgressScanLine />}
    </div>
  );
};
