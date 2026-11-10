import { FC } from 'react';
import { NodeProps } from '@xyflow/react';

import { NodeIssuesBadge } from './node-issues-badge';
import { NodePortHandles } from './node-port-handles';
import { NodeRunIndicator } from './node-run-indicator';
import { NodeTypeIcon } from './node-type-icon';
import { useWorkflowNodeTypes } from '../hooks/use-workflow-node-types';
import { useWorkflowRun } from '../hooks/use-workflow-run';
import { CanvasNode } from '../types/workflow-editor.types';
import { findNodeType } from '../utils/find-node-type';
import { findMissingProperties } from '../utils/node-parameters';
import { isIssueForNode } from '../utils/run-issues';

import { cn } from '@/shared/utils/cn';

export const KnownCanvasNode: FC<NodeProps<CanvasNode>> = ({ id, data, selected }) => {
  const nodeType = findNodeType(useWorkflowNodeTypes(), data.type, data.typeVersion);
  const missing = findMissingProperties(nodeType.properties, data.parameters);
  const isRunBlocked = useWorkflowRun().issues.some((issue) => isIssueForNode(issue, data.name));

  return (
    <div className='animate-in fade-in zoom-in-90 flex w-24 flex-col items-center duration-300'>
      <div
        className={cn(
          'bg-card border-primary-soft/30 shadow-primary/25 relative flex size-24 items-center justify-center border shadow-[0_0_28px] transition-shadow',
          nodeType.group === 'trigger' ? 'rounded-l-[48px] rounded-r-xl' : 'rounded-xl',
          selected && 'border-beam shadow-primary/60',
          isRunBlocked && 'border-destructive shadow-destructive/40',
        )}>
        <NodeTypeIcon icon={nodeType.icon} className='text-primary-soft size-9 drop-shadow-[0_0_10px_var(--primary)]' />
        <NodePortHandles type='target' count={nodeType.inputs.length} labels={nodeType.inputs.map(({ name }) => name)} />
        <NodePortHandles type='source' count={nodeType.outputs.length} labels={nodeType.outputs.map(({ name }) => name)} />
        <NodeRunIndicator nodeId={id} />
        {missing.length > 0 && <NodeIssuesBadge missingLabels={missing.map((property) => property.displayName)} />}
      </div>
      <span className='mt-3 w-44 text-center text-xs leading-snug font-medium'>{data.name}</span>
      <span className='text-muted-foreground mt-1 font-mono text-[10px] tracking-widest whitespace-nowrap uppercase'>{nodeType.displayName}</span>
    </div>
  );
};
