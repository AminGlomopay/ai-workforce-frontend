import { FC } from 'react';

import { NodePaletteItem } from './node-palette-item';
import { WorkflowNodeType } from '../types/workflow-editor.types';

interface NodePaletteGroupProps {
  label: string;
  nodeTypes: WorkflowNodeType[];
}

export const NodePaletteGroup: FC<NodePaletteGroupProps> = ({ label, nodeTypes }) => (
  <section className='flex flex-col gap-2'>
    <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>{label}</span>
    <ul className='flex flex-col gap-2'>
      {nodeTypes.map((nodeType) => (
        <NodePaletteItem key={`${nodeType.type}@${nodeType.version}`} nodeType={nodeType} />
      ))}
    </ul>
  </section>
);
