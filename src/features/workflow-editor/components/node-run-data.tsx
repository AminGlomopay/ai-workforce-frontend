import { FC, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEdges, useNodes } from '@xyflow/react';

import { EmptyOutput } from './empty-output';
import { JsonBlock } from './json-block';
import { RunPicker } from './run-picker';
import { nodeRunsQueryOptions } from '../apis/workflow-editor.queries';
import { ITERATING_NODE_TYPES } from '../constants/workflow-editor.constants';
import { useWorkflowRun } from '../hooks/use-workflow-run';
import { CanvasNode, WorkflowPort } from '../types/workflow-editor.types';
import { NodeRun } from '../types/workflow-execution.types';
import { countFinishedRuns } from '../utils/execution-status';
import { countLoopIterations } from '../utils/graph-rules';

import { cn } from '@/shared/utils/cn';

interface NodeRunDataProps {
  executionId: string;
  nodeId: string;
  runs: NodeRun[];
  outputs: WorkflowPort[];
}

export const NodeRunData: FC<NodeRunDataProps> = ({ executionId, nodeId, runs, outputs }) => {
  const nodeRuns = useSuspenseQuery(nodeRunsQueryOptions(executionId, nodeId, countFinishedRuns(runs))).data;
  const loopIds = useNodes<CanvasNode>()
    .filter(({ data }) => ITERATING_NODE_TYPES.includes(data.type))
    .map(({ id }) => id);
  const edges = useEdges();
  const { execution } = useWorkflowRun();
  const [index, setIndex] = useState(0);
  const run = nodeRuns.at(Math.min(index, nodeRuns.length - 1));
  if (!run) throw new Error(`No run details for node ${nodeId}`);

  const label =
    run.iteration === null
      ? `Run ${index + 1} of ${nodeRuns.length}`
      : `Iteration ${run.iteration + 1} of ${countLoopIterations(edges, loopIds, nodeId, execution?.nodeRuns ?? [])}`;
  const durationMs = run.finishedAt === null ? null : Date.parse(run.finishedAt) - Date.parse(run.startedAt);

  return (
    <div className='flex flex-col gap-4'>
      {(nodeRuns.length > 1 || run.iteration !== null) && <RunPicker label={label} index={index} count={nodeRuns.length} onChange={setIndex} />}
      <span className='text-muted-foreground flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase'>
        <span className={cn('size-1.5 rounded-full', run.status === 'FAILED' ? 'bg-destructive' : 'bg-primary-soft')} />
        {run.status.toLowerCase()}
        {durationMs !== null && ` · ${durationMs} ms`}
      </span>
      {run.error && (
        <p className='text-destructive border-destructive/40 bg-destructive/5 rounded-lg border p-3 text-xs leading-snug wrap-break-word'>
          {run.error.message}
        </p>
      )}
      <JsonBlock label='Input' value={run.input} />
      {outputs.map((port, portIndex) => {
        const label = port.name ? `Output · ${port.name}` : 'Output';
        const data = run.output?.[portIndex];
        if (data) return <JsonBlock key={portIndex} label={label} value={data} />;
        const message = run.status === 'RUNNING' ? 'Waiting for output' : run.output ? 'Did not fire' : 'No output';
        return <EmptyOutput key={portIndex} label={label} message={message} />;
      })}
    </div>
  );
};
