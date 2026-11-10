import { FC } from 'react';
import { BaseEdge, EdgeProps, getBezierPath, useNodesData } from '@xyflow/react';

import { ITERATING_NODE_TYPES, LOOP_BODY_OUTPUT } from '../constants/workflow-editor.constants';
import { useWorkflowRun } from '../hooks/use-workflow-run';
import { CanvasEdge, CanvasNode } from '../types/workflow-editor.types';

import { cn } from '@/shared/utils/cn';

export const WorkflowEdge: FC<EdgeProps<CanvasEdge>> = ({
  id,
  source,
  sourceHandleId,
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
  const { firedPorts, runsByNode } = useWorkflowRun();
  const sourceType = useNodesData<CanvasNode>(source)?.data.type;
  const isLoopBody = sourceType !== undefined && ITERATING_NODE_TYPES.includes(sourceType) && sourceHandleId === LOOP_BODY_OUTPUT;
  // A loop's own run reports nothing on its body output; the body's runs show the edge carried data.
  const hasFired = firedPorts && (firedPorts.has(`${source}:${sourceHandleId}`) || (isLoopBody && runsByNode.has(target)));

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        interactionWidth={interactionWidth}
        className={cn(
          'transition-opacity duration-500',
          firedPorts && !hasFired && 'opacity-20',
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
