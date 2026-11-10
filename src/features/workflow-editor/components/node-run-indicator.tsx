import { FC } from 'react';
import { Check, LoaderCircle, X } from 'lucide-react';

import { useWorkflowRun } from '../hooks/use-workflow-run';
import { NodeRunStatus } from '../types/workflow-execution.types';

import { cn } from '@/shared/utils/cn';

const RING_CLASSES: Record<NodeRunStatus, string> = {
  RUNNING: 'border-beam border-transparent before:[animation-duration:1s]',
  SUCCEEDED: 'border-primary-soft/70 shadow-primary/50 shadow-[0_0_20px]',
  FAILED: 'border-destructive shadow-destructive/40 shadow-[0_0_20px]',
};

const BADGE_CLASSES: Record<NodeRunStatus, string> = {
  RUNNING: 'text-primary-soft border-primary-soft/50',
  SUCCEEDED: 'text-primary-soft border-primary-soft/50',
  FAILED: 'text-destructive border-destructive/50',
};

const STATUS_ICONS = { RUNNING: LoaderCircle, SUCCEEDED: Check, FAILED: X };

interface NodeRunIndicatorProps {
  nodeId: string;
}

export const NodeRunIndicator: FC<NodeRunIndicatorProps> = ({ nodeId }) => {
  const runs = useWorkflowRun().runsByNode.get(nodeId);
  if (!runs) return null;
  const statuses = runs.map(({ status }) => status);
  const status: NodeRunStatus = statuses.includes('RUNNING') ? 'RUNNING' : statuses.includes('FAILED') ? 'FAILED' : 'SUCCEEDED';
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
        <Icon className={cn('size-3', status === 'RUNNING' && 'animate-spin')} />
        {runs.length > 1 && `×${runs.length}`}
      </span>
    </>
  );
};
