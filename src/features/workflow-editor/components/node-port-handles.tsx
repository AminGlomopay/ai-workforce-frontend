import { FC } from 'react';
import { Handle, HandleType, Position } from '@xyflow/react';

import { cn } from '@/shared/utils/cn';

interface NodePortHandlesProps {
  type: HandleType;
  count: number;
  labels?: (string | undefined)[];
  isConnectable?: boolean;
}

export const NodePortHandles: FC<NodePortHandlesProps> = ({ type, count, labels = [], isConnectable = true }) =>
  Array.from({ length: count }, (_, index) => (
    <Handle
      key={index}
      id={String(index)}
      type={type}
      isConnectable={isConnectable}
      position={type === 'target' ? Position.Left : Position.Right}
      style={{ top: `${((index + 1) / (count + 1)) * 100}%` }}
      className='bg-background border-primary-soft hover:bg-primary-soft size-3 border-2 transition-colors'>
      {labels[index] && (
        <span
          className={cn(
            'text-primary-soft pointer-events-none absolute -top-4 font-mono text-[9px] tracking-widest whitespace-nowrap uppercase',
            type === 'source' ? 'left-2' : 'right-2',
          )}>
          {labels[index]}
        </span>
      )}
    </Handle>
  ));
