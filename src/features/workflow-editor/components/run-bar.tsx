import { FC } from 'react';
import { useReactFlow } from '@xyflow/react';
import { X } from 'lucide-react';

import { ProgressScanLine } from './progress-scan-line';
import { RUN_BAR_AUTO_HIDE_DELAY } from '../constants/workflow-editor.constants';
import { useFocusNode } from '../hooks/use-focus-node';
import { useRunBarAutoHide } from '../hooks/use-run-bar-auto-hide';
import { useWorkflowRun } from '../hooks/use-workflow-run';
import { CanvasNode } from '../types/workflow-editor.types';
import { ExecutionStatus } from '../types/workflow-execution.types';
import { isExecutionFinished } from '../utils/execution-status';

import { Button } from '@/shared/components/ui/button';
import { useExitAnimation } from '@/shared/hooks/use-exit-animation';
import { cn } from '@/shared/utils/cn';

const STATUS_LABELS: Record<ExecutionStatus, string> = {
  QUEUED: 'Run queued',
  RUNNING: 'Running',
  SUCCEEDED: 'Run succeeded',
  FAILED: 'Run failed',
  CRASHED: 'Run crashed',
};

const STATUS_DOTS: Record<ExecutionStatus, string> = {
  QUEUED: 'bg-primary-soft animate-pulse',
  RUNNING: 'bg-primary-soft animate-pulse',
  SUCCEEDED: 'bg-primary-soft shadow-[0_0_8px_var(--primary-soft)]',
  FAILED: 'bg-destructive',
  CRASHED: 'bg-destructive',
};

export const RunBar: FC = () => {
  const { execution: currentExecution, setExecutionId } = useWorkflowRun();
  const { visibleExecution, isCountingDown, onMouseEnter, onMouseLeave } = useRunBarAutoHide(currentExecution);
  const { rendered: execution, isExiting, onAnimationEnd } = useExitAnimation(visibleExecution);
  const { getNode } = useReactFlow<CanvasNode>();
  const focusNode = useFocusNode();
  if (!execution) return null;

  const { status, nodeRuns, startedAt, finishedAt, error } = execution;
  const isFinished = isExecutionFinished(status);
  const durationMs = startedAt && finishedAt ? Date.parse(finishedAt) - Date.parse(startedAt) : null;
  const failedNode = error && getNode(error.nodeId);

  return (
    <div
      key={execution.id}
      onAnimationEnd={onAnimationEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        'bg-popover/80 border-primary-soft/25 shadow-primary/30 absolute top-4 left-1/2 z-10 flex max-w-[90%] -translate-x-1/2 items-center gap-3 overflow-hidden rounded-full border py-1.5 pr-1.5 pl-4 shadow-[0_0_32px] backdrop-blur-xl',
        isExiting
          ? 'animate-out fade-out slide-out-to-top-2 fill-mode-forwards pointer-events-none duration-300'
          : 'animate-in fade-in slide-in-from-top-2 duration-500',
      )}>
      <span className='text-muted-foreground flex items-center gap-2 font-mono text-[10px] tracking-widest whitespace-nowrap uppercase'>
        <span className={cn('size-1.5 rounded-full', STATUS_DOTS[status])} />
        <span className={cn(error ? 'text-destructive' : 'text-foreground')}>{STATUS_LABELS[status]}</span>· {nodeRuns.length}{' '}
        {nodeRuns.length === 1 ? 'node run' : 'node runs'}
        {durationMs !== null && ` · ${(durationMs / 1000).toFixed(1)}s`}
      </span>
      {error && (
        <Button
          variant='link'
          className='text-foreground hover:text-primary-soft h-auto min-w-0 truncate p-0 text-xs font-normal'
          title={error.message}
          onClick={() => failedNode && focusNode(failedNode.id)}>
          {failedNode && `${failedNode.data.name}: `}
          {error.message}
        </Button>
      )}
      <Button variant='ghost' size='icon-xs' aria-label='Clear run' disabled={!isFinished} onClick={() => setExecutionId(null)}>
        <X />
      </Button>
      {!isFinished && <ProgressScanLine />}
      {isCountingDown && !isExiting && (
        <span
          className='from-primary to-primary-soft animate-drain absolute inset-x-6 bottom-0 h-px origin-left bg-linear-to-r'
          style={{ animationDuration: `${RUN_BAR_AUTO_HIDE_DELAY}ms` }}
        />
      )}
    </div>
  );
};
