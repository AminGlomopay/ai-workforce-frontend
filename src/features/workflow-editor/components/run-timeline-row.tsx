import { FC } from 'react';

import { NodeRun, NodeRunStatus } from '../types/workflow-execution.types';
import { formatDuration } from '../utils/format-duration';

import { cn } from '@/shared/utils/cn';

const BAR_CLASSES: Record<NodeRunStatus, string> = {
  RUNNING: 'bg-primary-soft animate-pulse shadow-[0_0_8px_var(--primary-soft)]',
  WAITING: 'border-primary-soft/70 border border-dashed',
  SUCCEEDED: 'from-primary to-primary-soft bg-linear-to-r shadow-[0_0_8px_var(--primary-soft)]',
  FAILED: 'bg-destructive shadow-[0_0_8px_var(--destructive)]',
};

// Keeps instant runs visible as a sliver on the track.
const MIN_BAR_PERCENT = 0.75;

interface RunTimelineRowProps {
  run: NodeRun;
  name: string;
  startMs: number;
  spanMs: number;
  now: number;
  index: number;
  onSelect: () => void;
}

export const RunTimelineRow: FC<RunTimelineRowProps> = ({ run, name, startMs, spanMs, now, index, onSelect }) => {
  const runStartMs = Date.parse(run.startedAt);
  const durationMs = (run.finishedAt ? Date.parse(run.finishedAt) : now) - runStartMs;

  return (
    <li>
      <button
        type='button'
        onClick={onSelect}
        className='group hover:bg-primary/5 grid w-full grid-cols-[7.5rem_1fr_3.75rem] items-center gap-3 rounded-md px-1.5 py-1 text-left transition-colors'>
        <span className='truncate text-xs' title={name}>
          {name}
          {run.iteration !== null && <span className='text-muted-foreground font-mono text-[10px]'> #{run.iteration + 1}</span>}
        </span>
        <span className='bg-secondary/60 relative h-2 rounded-full'>
          <span
            className={cn('animate-grow-x absolute inset-y-0 origin-left rounded-full', BAR_CLASSES[run.status])}
            style={{
              left: `${((runStartMs - startMs) / spanMs) * 100}%`,
              width: `max(${(durationMs / spanMs) * 100}%, ${MIN_BAR_PERCENT}%)`,
              animationDelay: `${Math.min(index, 20) * 35}ms`,
            }}
          />
        </span>
        <span
          className={cn(
            'text-right font-mono text-[10px] tabular-nums',
            run.status === 'FAILED' ? 'text-destructive' : 'text-muted-foreground group-hover:text-foreground',
          )}>
          {formatDuration(durationMs)}
        </span>
      </button>
    </li>
  );
};
