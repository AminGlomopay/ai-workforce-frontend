import { FC } from 'react';
import { BaseEdge, EdgeProps, getBezierPath } from '@xyflow/react';

import { useWorkflowRun } from '../hooks/use-workflow-run';
import { CanvasEdge } from '../types/workflow-editor.types';
import { isExecutionFinished } from '../utils/execution-status';

import { cn } from '@/shared/utils/cn';

export const WorkflowEdge: FC<EdgeProps<CanvasEdge>> = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  markerEnd,
  interactionWidth,
}) => {
  const [path] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const { execution, runsByNode } = useWorkflowRun();
  const isFinished = execution !== undefined && isExecutionFinished(execution.status);
  // Node runs don't record which output fired, so an edge carried data when the nodes at both ends ran.
  const hasFired = isFinished && runsByNode.has(source) && runsByNode.has(target);

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        interactionWidth={interactionWidth}
        className={cn(
          'transition-opacity duration-500',
          isFinished && !hasFired && 'opacity-20',
          hasFired && 'stroke-primary-soft! stroke-2! drop-shadow-[0_0_6px_var(--primary-soft)]',
        )}
      />
      {hasFired && (
        <circle r='3' className='fill-foreground drop-shadow-[0_0_6px_var(--primary-soft)]'>
          <animateMotion dur='1.8s' repeatCount='indefinite' path={path} />
        </circle>
      )}
    </>
  );
};
