import { FC, Suspense } from 'react';
import { useReactFlow } from '@xyflow/react';
import { ArrowLeft, CircleHelp } from 'lucide-react';

import { EmptyOutput } from './empty-output';
import { NodeRunData } from './node-run-data';
import { NodeSettingsHeader } from './node-settings-header';
import { NodeTypeIcon } from './node-type-icon';
import { ParametersSnapshot } from './parameters-snapshot';
import { RunDataLoading } from './run-data-loading';
import { useWorkflowNodeTypes } from '../hooks/use-workflow-node-types';
import { useWorkflowRun } from '../hooks/use-workflow-run';
import { CanvasNode } from '../types/workflow-editor.types';
import { WorkflowExecutionDetail } from '../types/workflow-execution.types';
import { summarizeNodeRunStatus } from '../utils/execution-status';
import { findNodeType, hasNodeType } from '../utils/find-node-type';
import { isPropertyVisible } from '../utils/is-property-visible';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

interface ReplayNodeDetailsProps {
  execution: WorkflowExecutionDetail;
  node: CanvasNode;
}

export const ReplayNodeDetails: FC<ReplayNodeDetailsProps> = ({ execution, node }) => {
  const nodeTypes = useWorkflowNodeTypes();
  const runs = useWorkflowRun().runsByNode.get(node.id);
  const { setNodes } = useReactFlow<CanvasNode>();
  const { name, type, typeVersion, parameters } = node.data;
  const nodeType = hasNodeType(nodeTypes, type, typeVersion) ? findNodeType(nodeTypes, type, typeVersion) : undefined;
  const status = runs && summarizeNodeRunStatus(runs);
  // Known types label their visible fields; an unknown type shows its parameters as saved.
  const parameterEntries: [string, string][] = nodeType
    ? nodeType.properties
        .filter((property) => isPropertyVisible(property, parameters))
        .map((property) => [property.displayName, parameters[property.name]])
    : Object.entries(parameters);

  return (
    <>
      <Button
        variant='ghost'
        size='xs'
        className='text-muted-foreground -mb-3 self-start font-mono text-[10px] tracking-widest uppercase'
        onClick={() => setNodes((nodes) => nodes.map((canvasNode) => ({ ...canvasNode, selected: false })))}>
        <ArrowLeft />
        Run summary
      </Button>
      <NodeSettingsHeader
        eyebrow='Node run'
        icon={
          nodeType ? (
            <NodeTypeIcon icon={nodeType.icon} className='text-primary-soft size-5' />
          ) : (
            <CircleHelp className='text-muted-foreground size-5' />
          )
        }
        title={<span className='truncate text-sm font-semibold tracking-tight'>{name}</span>}
        typeLabel={nodeType ? `${nodeType.displayName} · v${nodeType.version}` : `Unknown node · ${type}@${typeVersion}`}
        status={
          <>
            <span
              className={cn('size-1.5 rounded-full', !status ? 'bg-muted-foreground/60' : status === 'FAILED' ? 'bg-destructive' : 'bg-primary-soft')}
            />
            {runs ? `${status?.toLowerCase()} · ${runs.length} ${runs.length === 1 ? 'run' : 'runs'}` : 'Did not run'}
          </>
        }
      />
      {runs ? (
        <Suspense fallback={<RunDataLoading />}>
          <NodeRunData executionId={execution.id} nodeId={node.id} runs={runs} />
        </Suspense>
      ) : (
        <EmptyOutput label='Output' message='This node did not run' />
      )}
      <ParametersSnapshot entries={parameterEntries} />
    </>
  );
};
