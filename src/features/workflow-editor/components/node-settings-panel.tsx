import { FC } from 'react';

import { KnownNodeSettings } from './known-node-settings';
import { UnknownNodeSettings } from './unknown-node-settings';
import { useSelectedNode } from '../hooks/use-selected-node';
import { useWorkflowNodeTypes } from '../hooks/use-workflow-node-types';
import { findNodeType, hasNodeType } from '../utils/find-node-type';

// nokey stops React Flow from deleting the node when Backspace is pressed inside a field.
export const NodeSettingsPanel: FC = () => {
  const node = useSelectedNode();
  const nodeTypes = useWorkflowNodeTypes();
  if (!node) return null;

  return (
    <aside
      key={node.id}
      className='nokey bg-sidebar animate-in fade-in slide-in-from-right-4 fill-mode-both flex w-80 shrink-0 flex-col gap-6 overflow-y-auto border-l p-5 duration-300'>
      {hasNodeType(nodeTypes, node.data.type, node.data.typeVersion) ? (
        <KnownNodeSettings node={node} nodeType={findNodeType(nodeTypes, node.data.type, node.data.typeVersion)} />
      ) : (
        <UnknownNodeSettings node={node} />
      )}
    </aside>
  );
};
