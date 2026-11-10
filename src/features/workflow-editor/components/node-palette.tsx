import { FC } from 'react';

import { NodePaletteGroup } from './node-palette-group';
import { NODE_GROUP_LABELS } from '../constants/workflow-editor.constants';
import { useWorkflowNodeTypes } from '../hooks/use-workflow-node-types';

export const NodePalette: FC = () => {
  const nodeTypes = useWorkflowNodeTypes();

  return (
    <aside className='bg-sidebar animate-in fade-in slide-in-from-left-2 fill-mode-both flex w-72 shrink-0 flex-col gap-6 overflow-y-auto border-r p-4 duration-500'>
      <div className='flex flex-col gap-1'>
        <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>Node palette</span>
        <span className='text-muted-foreground text-xs'>Drag a node onto the canvas.</span>
      </div>
      {Object.entries(NODE_GROUP_LABELS).map(([group, label]) => (
        <NodePaletteGroup key={group} label={label} nodeTypes={nodeTypes.filter((nodeType) => nodeType.group === group)} />
      ))}
    </aside>
  );
};
