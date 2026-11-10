import { FC, Suspense } from 'react';

import { NodeParametersForm } from './node-parameters-form';
import { NodeRunData } from './node-run-data';
import { NodeRunIssues } from './node-run-issues';
import { NodeSettingsHeader } from './node-settings-header';
import { NodeTypeIcon } from './node-type-icon';
import { RunDataLoading } from './run-data-loading';
import { useWorkflowRun } from '../hooks/use-workflow-run';
import { CanvasNode, WorkflowNodeType } from '../types/workflow-editor.types';
import { findMissingProperties } from '../utils/node-parameters';
import { isIssueForNode } from '../utils/run-issues';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { cn } from '@/shared/utils/cn';

interface KnownNodeSettingsProps {
  node: CanvasNode;
  nodeType: WorkflowNodeType;
}

export const KnownNodeSettings: FC<KnownNodeSettingsProps> = ({ node, nodeType }) => {
  const { execution, runsByNode, issues } = useWorkflowRun();
  const runs = runsByNode.get(node.id);
  const nodeIssues = issues.filter((issue) => isIssueForNode(issue, node.data.name));
  const missingCount = findMissingProperties(nodeType.properties, node.data.parameters).length;
  const parameters = nodeType.properties.length ? (
    <NodeParametersForm node={node} nodeType={nodeType} />
  ) : (
    <p className='text-muted-foreground text-xs'>This node has no settings.</p>
  );

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
      {nodeIssues.length > 0 && <NodeRunIssues issues={nodeIssues} />}
      {/* Tabs mount once per run and pick their tab then, so results arriving never pull the user out of the form. */}
      {execution ? (
        <Tabs defaultValue={runs ? 'run' : 'parameters'} className='gap-5'>
          <TabsList className='w-full'>
            <TabsTrigger value='parameters'>Parameters</TabsTrigger>
            <TabsTrigger value='run'>Run data</TabsTrigger>
          </TabsList>
          <TabsContent value='parameters'>{parameters}</TabsContent>
          <TabsContent value='run'>
            {runs ? (
              <Suspense fallback={<RunDataLoading />}>
                <NodeRunData executionId={execution.id} nodeId={node.id} runs={runs} outputs={nodeType.outputs} />
              </Suspense>
            ) : (
              <p className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>No runs in this execution yet</p>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        parameters
      )}
    </>
  );
};
