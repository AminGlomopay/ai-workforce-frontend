import { FC } from 'react';

import { NodePaletteApp } from './node-palette-app';
import { NodePaletteItem } from './node-palette-item';
import { WorkflowNodeType } from '../types/workflow-editor.types';
import { toPaletteActions } from '../utils/palette-actions';

interface NodePaletteGroupProps {
  label: string;
  nodeTypes: WorkflowNodeType[];
  onOpen: (nodeType: WorkflowNodeType) => void;
}

export const NodePaletteGroup: FC<NodePaletteGroupProps> = ({ label, nodeTypes, onOpen }) => (
  <section className='flex flex-col gap-2'>
    <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>{label}</span>
    <ul className='flex flex-col gap-2'>
      {nodeTypes.map((nodeType) => {
        const actionCount = toPaletteActions(nodeType).length;
        return actionCount ? (
          <NodePaletteApp
            key={`${nodeType.type}@${nodeType.version}`}
            nodeType={nodeType}
            actionCount={actionCount}
            onOpen={() => onOpen(nodeType)}
          />
        ) : (
          <NodePaletteItem
            key={`${nodeType.type}@${nodeType.version}`}
            nodeType={nodeType}
            entry={{
              key: nodeType.type,
              label: nodeType.displayName,
              description: nodeType.description,
              nodeName: nodeType.defaults.name,
              parameters: {},
            }}
          />
        );
      })}
    </ul>
  </section>
);
