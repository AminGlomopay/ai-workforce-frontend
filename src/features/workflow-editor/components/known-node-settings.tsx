import { FC } from 'react';

import { NodeParametersForm } from './node-parameters-form';
import { NodeSettingsHeader } from './node-settings-header';
import { NodeTypeIcon } from './node-type-icon';
import { CanvasNode, WorkflowNodeType } from '../types/workflow-editor.types';
import { findMissingProperties } from '../utils/node-parameters';

import { cn } from '@/shared/utils/cn';

interface KnownNodeSettingsProps {
  node: CanvasNode;
  nodeType: WorkflowNodeType;
}

export const KnownNodeSettings: FC<KnownNodeSettingsProps> = ({ node, nodeType }) => {
  const missingCount = findMissingProperties(nodeType.properties, node.data.parameters).length;

  return (
    <>
      <NodeSettingsHeader
        icon={<NodeTypeIcon icon={nodeType.icon} className='text-primary-soft size-5' />}
        name={node.data.name}
        typeLabel={`${nodeType.displayName} · v${nodeType.version}`}
        status={
          <>
            <span className={cn('size-1.5 rounded-full', missingCount ? 'bg-destructive animate-pulse' : 'bg-primary-soft')} />
            {missingCount ? `${missingCount} required ${missingCount === 1 ? 'field' : 'fields'} empty` : 'All required fields set'}
          </>
        }
      />
      {nodeType.properties.length ? (
        <NodeParametersForm node={node} nodeType={nodeType} />
      ) : (
        <p className='text-muted-foreground text-xs'>This node has no settings.</p>
      )}
    </>
  );
};
