import { FC } from 'react';

import { KnownNodeSettings } from './known-node-settings';
import { UnknownNodeSettings } from './unknown-node-settings';
import { useSelectedNode } from '../hooks/use-selected-node';
import { useWorkflowNodeTypes } from '../hooks/use-workflow-node-types';
import { findNodeType, hasNodeType } from '../utils/find-node-type';

import { useExitAnimation } from '@/shared/hooks/use-exit-animation';
import { cn } from '@/shared/utils/cn';

// The outer column animates its width so the canvas grows into the space instead of jumping; the inner panel keeps
// a fixed width so its content never reflows. nokey stops React Flow from deleting the node on Backspace in a field.
export const NodeSettingsPanel: FC = () => {
  const { rendered: node, isExiting, onAnimationEnd } = useExitAnimation(useSelectedNode());
  const nodeTypes = useWorkflowNodeTypes();
  if (!node) return null;

  return (
    <div
      onAnimationEnd={onAnimationEnd}
      className={cn('bg-sidebar w-96 shrink-0 overflow-hidden border-l', isExiting ? 'animate-drawer-out pointer-events-none' : 'animate-drawer-in')}>
      <aside
        key={node.id}
        className={cn(
          'nokey flex h-full w-96 flex-col gap-6 overflow-y-auto p-5 duration-300',
          isExiting ? 'animate-out fade-out fill-mode-forwards' : 'animate-in fade-in slide-in-from-right-4 fill-mode-both',
        )}>
        {hasNodeType(nodeTypes, node.data.type, node.data.typeVersion) ? (
          <KnownNodeSettings node={node} nodeType={findNodeType(nodeTypes, node.data.type, node.data.typeVersion)} />
        ) : (
          <UnknownNodeSettings node={node} />
        )}
      </aside>
    </div>
  );
};
