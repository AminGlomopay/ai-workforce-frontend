import { FC } from 'react';
import { NodeProps, useNodeConnections } from '@xyflow/react';
import { CircleHelp } from 'lucide-react';

import { NodePortHandles } from './node-port-handles';
import { CanvasNode } from '../types/workflow-editor.types';

import { cn } from '@/shared/utils/cn';

// The backend no longer describes this type, so its ports are inferred from the saved connections.
export const UnknownCanvasNode: FC<NodeProps<CanvasNode>> = ({ data, selected }) => {
  const inputs = useNodeConnections({ handleType: 'target' });
  const outputs = useNodeConnections({ handleType: 'source' });

  return (
    <div className='animate-in fade-in zoom-in-90 flex w-24 flex-col items-center duration-300'>
      <div
        className={cn(
          'bg-card/60 border-muted-foreground/40 relative flex size-24 items-center justify-center rounded-xl border border-dashed',
          selected && 'border-primary-soft',
        )}>
        <CircleHelp className='text-muted-foreground size-9' />
        <NodePortHandles type='target' count={Math.max(0, ...inputs.map(({ targetHandle }) => Number(targetHandle) + 1))} isConnectable={false} />
        <NodePortHandles type='source' count={Math.max(0, ...outputs.map(({ sourceHandle }) => Number(sourceHandle) + 1))} isConnectable={false} />
      </div>
      <span className='mt-3 w-44 text-center text-xs leading-snug font-medium'>{data.name}</span>
      <span className='text-muted-foreground mt-1 font-mono text-[10px] tracking-widest whitespace-nowrap uppercase'>Unknown node</span>
      <span className='text-muted-foreground font-mono text-[10px] whitespace-nowrap'>
        {data.type}@{data.typeVersion}
      </span>
    </div>
  );
};
