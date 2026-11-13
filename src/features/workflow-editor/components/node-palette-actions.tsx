import { FC } from 'react';
import { ArrowLeft } from 'lucide-react';

import { NodePaletteItem } from './node-palette-item';
import { NodeTypeIcon } from './node-type-icon';
import { WorkflowNodeType } from '../types/workflow-editor.types';
import { toPaletteActions } from '../utils/palette-actions';

import { Button } from '@/shared/components/ui/button';

interface NodePaletteActionsProps {
  nodeType: WorkflowNodeType;
  onBack: () => void;
}

export const NodePaletteActions: FC<NodePaletteActionsProps> = ({ nodeType, onBack }) => (
  <div className='animate-in fade-in slide-in-from-right-4 fill-mode-both flex flex-col gap-6 duration-300'>
    <div className='flex items-center gap-3'>
      <Button variant='ghost' size='icon-sm' aria-label='Back to all nodes' onClick={onBack}>
        <ArrowLeft />
      </Button>
      <span className='bg-secondary text-primary-soft flex size-8 shrink-0 items-center justify-center rounded-md border'>
        <NodeTypeIcon icon={nodeType.icon} className='size-4' />
      </span>
      <div className='flex flex-col'>
        <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>Actions</span>
        <span className='text-sm font-semibold tracking-tight'>{nodeType.displayName}</span>
      </div>
    </div>
    <ul className='flex flex-col gap-2'>
      {toPaletteActions(nodeType).map((entry) => (
        <NodePaletteItem key={entry.key} nodeType={nodeType} entry={entry} />
      ))}
    </ul>
  </div>
);
