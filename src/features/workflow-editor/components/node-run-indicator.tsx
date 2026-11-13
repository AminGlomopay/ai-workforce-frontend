import { FC } from 'react';
import { Check, Hourglass, LoaderCircle, X } from 'lucide-react';

import { useWorkflowRun } from '../hooks/use-workflow-run';
import { NodeRunStatus } from '../types/workflow-execution.types';
import { summarizeNodeRunStatus, totalRunDuration } from '../utils/execution-status';
import { formatDuration } from '../utils/format-duration';

import { cn } from '@/shared/utils/cn';

const RING_CLASSES: Record<NodeRunStatus, string> = {
  RUNNING: 'border-beam border-transparent before:[animation-duration:1s]',
  WAITING: 'border-primary-soft/50 shadow-primary/30 border-dashed shadow-[0_0_20px]',
  SUCCEEDED: 'border-primary-soft/70 shadow-primary/50 shadow-[0_0_20px]',
  FAILED: 'border-destructive shadow-destructive/40 shadow-[0_0_20px]',
};

const BADGE_CLASSES: Record<NodeRunStatus, string> = {
  RUNNING: 'text-primary-soft border-primary-soft/50',
  WAITING: 'text-primary-soft border-primary-soft/50',
  SUCCEEDED: 'text-primary-soft border-primary-soft/50',
  FAILED: 'text-destructive border-destructive/50',
};

const STATUS_ICONS = { RUNNING: LoaderCircle, WAITING: Hourglass, SUCCEEDED: Check, FAILED: X };

interface NodeRunIndicatorProps {
  nodeId: string;
}

export const NodeRunIndicator: FC<NodeRunIndicatorProps> = ({ nodeId }) => {
  const runs = useWorkflowRun().runsByNode.get(nodeId);
  if (!runs) return null;
  const status = summarizeNodeRunStatus(runs);
  const Icon = STATUS_ICONS[status];

  return (
    <>
      <span
        className={cn('animate-in fade-in pointer-events-none absolute -inset-1.5 rounded-[inherit] border duration-500', RING_CLASSES[status])}
      />
      <span
        className={cn(
          'bg-background animate-in zoom-in-50 absolute -top-2 -left-2 flex items-center gap-1 rounded-full border px-1.5 py-0.5 font-mono text-[10px] duration-300',
          BADGE_CLASSES[status],
        )}>
        <Icon className={cn('size-3', status === 'RUNNING' && 'animate-spin', status === 'WAITING' && 'animate-breathe')} />
        {runs.length > 1 && `×${runs.length}`}
        {(status === 'SUCCEEDED' || status === 'FAILED') && <span className='text-muted-foreground'>{formatDuration(totalRunDuration(runs))}</span>}
      </span>
    </>
  );
};
