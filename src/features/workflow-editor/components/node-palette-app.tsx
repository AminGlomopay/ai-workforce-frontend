import { FC } from 'react';
import { ChevronRight } from 'lucide-react';

import { NodeTypeIcon } from './node-type-icon';
import { WorkflowNodeType } from '../types/workflow-editor.types';

import { Button } from '@/shared/components/ui/button';

interface NodePaletteAppProps {
  nodeType: WorkflowNodeType;
  actionCount: number;
  onOpen: () => void;
}

export const NodePaletteApp: FC<NodePaletteAppProps> = ({ nodeType, actionCount, onOpen }) => (
  <li>
    <Button
      variant='ghost'
      className='group border-border hover:border-primary-soft/40 hover:bg-primary/5 dark:hover:bg-primary/5 h-auto w-full items-start justify-start gap-3 p-3 text-left font-normal whitespace-normal'
      onClick={onOpen}>
      <span className='bg-secondary text-primary-soft flex size-8 shrink-0 items-center justify-center rounded-md border'>
        <NodeTypeIcon icon={nodeType.icon} className='size-4' />
      </span>
      <div className='flex flex-1 flex-col gap-1'>
        <span className='text-xs font-medium'>{nodeType.displayName}</span>
        <span className='text-muted-foreground text-xs leading-snug'>{nodeType.description}</span>
        <span className='text-muted-foreground group-hover:text-primary-soft font-mono text-[10px] tracking-widest uppercase transition-colors'>
          {actionCount} {actionCount === 1 ? 'action' : 'actions'}
        </span>
      </div>
      <ChevronRight className='text-muted-foreground group-hover:text-primary-soft size-4 shrink-0 transition-colors' />
    </Button>
  </li>
);
