import { DragEvent, FC } from 'react';
import { useNodes } from '@xyflow/react';
import { GripVertical } from 'lucide-react';

import { NodeTypeIcon } from './node-type-icon';
import { NODE_TYPE_DRAG_FORMAT } from '../constants/workflow-editor.constants';
import { CanvasNode, PaletteEntry, WorkflowNodeType } from '../types/workflow-editor.types';

import { cn } from '@/shared/utils/cn';

interface NodePaletteItemProps {
  nodeType: WorkflowNodeType;
  entry: PaletteEntry;
}

export const NodePaletteItem: FC<NodePaletteItemProps> = ({ nodeType, entry }) => {
  const count = useNodes<CanvasNode>().filter(({ data }) => data.type === nodeType.type && data.typeVersion === nodeType.version).length;
  const isAtLimit = nodeType.maxNodes !== undefined && count >= nodeType.maxNodes;

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData(
      NODE_TYPE_DRAG_FORMAT,
      JSON.stringify({ type: nodeType.type, version: nodeType.version, name: entry.nodeName, parameters: entry.parameters }),
    );
    event.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <li
      draggable={!isAtLimit}
      onDragStart={onDragStart}
      aria-disabled={isAtLimit}
      className={cn(
        'group flex gap-3 rounded-lg border p-3 transition-colors',
        isAtLimit ? 'cursor-not-allowed opacity-50' : 'hover:border-primary-soft/40 hover:bg-primary/5 cursor-grab active:cursor-grabbing',
      )}>
      <span className='bg-secondary text-primary-soft flex size-8 shrink-0 items-center justify-center rounded-md border'>
        <NodeTypeIcon icon={nodeType.icon} className='size-4' />
      </span>
      <div className='flex flex-1 flex-col gap-1'>
        <span className='text-xs font-medium'>{entry.label}</span>
        <span className='text-muted-foreground text-xs leading-snug'>{entry.description}</span>
        {nodeType.maxNodes !== undefined && (
          <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>
            {count}/{nodeType.maxNodes} on canvas{isAtLimit && ' · limit reached'}
          </span>
        )}
      </div>
      {!isAtLimit && <GripVertical className='text-muted-foreground group-hover:text-primary-soft size-4 shrink-0 transition-colors' />}
    </li>
  );
};
