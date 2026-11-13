import { FC } from 'react';

import { useNow } from '../hooks/use-now';
import { WorkflowExecutionDetail } from '../types/workflow-execution.types';
import { isExecutionBusy } from '../utils/execution-status';
import { formatDuration } from '../utils/format-duration';

import { cn } from '@/shared/utils/cn';

const formatClock = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 });

interface RunPhaseBarProps {
  execution: WorkflowExecutionDetail;
}

// Splits wall time into waiting for a worker and running, which answers "why was this slow?" at a glance.
export const RunPhaseBar: FC<RunPhaseBarProps> = ({ execution }) => {
  const { status, createdAt, startedAt, finishedAt } = execution;
  const now = useNow(isExecutionBusy(status));
  const queuedMs = (startedAt ? Date.parse(startedAt) : now) - Date.parse(createdAt);
  const ranMs = startedAt ? (finishedAt ? Date.parse(finishedAt) : now) - Date.parse(startedAt) : 0;
  const totalMs = Math.max(queuedMs + ranMs, 1);
  const isFailed = status === 'FAILED' || status === 'CRASHED';

  return (
    <section className='flex flex-col gap-2'>
      <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>Timing</span>
      <div className='bg-secondary flex h-1.5 overflow-hidden rounded-full'>
        <span className='bg-muted-foreground/50 animate-grow-x origin-left' style={{ width: `${(queuedMs / totalMs) * 100}%` }} />
        <span
          className={cn(
            'animate-grow-x origin-left [animation-delay:200ms]',
            isFailed ? 'bg-destructive' : 'from-primary to-primary-soft bg-linear-to-r shadow-[0_0_10px_var(--primary-soft)]',
            isExecutionBusy(status) && 'animate-pulse',
          )}
          style={{ width: `${(ranMs / totalMs) * 100}%` }}
        />
      </div>
      <dl className='text-muted-foreground grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[10px] tracking-widest uppercase'>
        <dt className='flex items-center gap-1.5'>
          <span className='bg-muted-foreground/50 size-1.5 rounded-full' />
          Queued
        </dt>
        <dt className='flex items-center gap-1.5'>
          <span className={cn('size-1.5 rounded-full', isFailed ? 'bg-destructive' : 'bg-primary-soft')} />
          Ran
        </dt>
        <dd className='text-foreground tabular-nums'>{formatDuration(queuedMs)}</dd>
        <dd className='text-foreground tabular-nums'>{startedAt ? formatDuration(ranMs) : '—'}</dd>
        <dd className='normal-case tabular-nums'>{startedAt ? `Started ${formatClock(startedAt)}` : 'Not started'}</dd>
        <dd className='normal-case tabular-nums'>{finishedAt ? `Ended ${formatClock(finishedAt)}` : 'In progress'}</dd>
      </dl>
    </section>
  );
};
