import { FC, useState } from 'react';

import { NodePaletteActions } from './node-palette-actions';
import { NodePaletteGroup } from './node-palette-group';
import { NODE_GROUP_LABELS } from '../constants/workflow-editor.constants';
import { useWorkflowNodeTypes } from '../hooks/use-workflow-node-types';
import { WorkflowNodeType } from '../types/workflow-editor.types';

export const NodePalette: FC = () => {
  const nodeTypes = useWorkflowNodeTypes();
  const [openNodeType, setOpenNodeType] = useState<WorkflowNodeType | null>(null);

  return (
    <aside className='bg-sidebar animate-in fade-in slide-in-from-right-2 fill-mode-both flex w-72 shrink-0 flex-col gap-6 overflow-y-auto border-l p-4 duration-500'>
      {openNodeType ? (
        <NodePaletteActions nodeType={openNodeType} onBack={() => setOpenNodeType(null)} />
      ) : (
        <>
          <div className='flex flex-col gap-1'>
            <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>Node palette</span>
            <span className='text-muted-foreground text-xs'>Drag a node onto the canvas, or open an app to pick an action.</span>
          </div>
          {Object.entries(NODE_GROUP_LABELS).map(([group, label]) => (
            <NodePaletteGroup
              key={group}
              label={label}
              nodeTypes={nodeTypes.filter((nodeType) => nodeType.group === group)}
              onOpen={setOpenNodeType}
            />
          ))}
        </>
      )}
    </aside>
  );
};
