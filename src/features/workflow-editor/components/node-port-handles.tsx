import { FC } from 'react';
import { Handle, HandleType, Position } from '@xyflow/react';

interface NodePortHandlesProps {
  type: HandleType;
  count: number;
  isConnectable?: boolean;
}

export const NodePortHandles: FC<NodePortHandlesProps> = ({ type, count, isConnectable = true }) =>
  Array.from({ length: count }, (_, index) => (
    <Handle
      key={index}
      id={String(index)}
      type={type}
      isConnectable={isConnectable}
      position={type === 'target' ? Position.Left : Position.Right}
      style={{ top: `${((index + 1) / (count + 1)) * 100}%` }}
      className='bg-background border-primary-soft hover:bg-primary-soft size-3 border-2 transition-colors'
    />
  ));
