import { FC } from 'react';

import { RunTimelineRow } from './run-timeline-row';
import { useFocusNode } from '../hooks/use-focus-node';
import { useNow } from '../hooks/use-now';
import { WorkflowVersion } from '../types/workflow-editor.types';
import { WorkflowExecutionDetail } from '../types/workflow-execution.types';
import { isExecutionBusy } from '../utils/execution-status';
import { formatDuration } from '../utils/format-duration';

interface RunTimelineProps {
  execution: WorkflowExecutionDetail;
  version: WorkflowVersion;
}

// A waterfall of every node run on one time axis, so slow steps and loop iterations stand out.
export const RunTimeline: FC<RunTimelineProps> = ({ execution, version }) => {
  const { status, startedAt, createdAt, finishedAt, nodeRuns } = execution;
  const now = useNow(isExecutionBusy(status));
  const focusNode = useFocusNode();
  const startMs = Date.parse(startedAt ?? createdAt);
  const spanMs = Math.max((finishedAt ? Date.parse(finishedAt) : now) - startMs, 1);
  const nodeNames = new Map(version.nodes.map(({ id, name }) => [id, name]));
  const nodeName = (nodeId: string) => {
    const name = nodeNames.get(nodeId);
    if (name === undefined) throw new Error(`Node ${nodeId} ran but is not in version ${version.number}`);
    return name;
  };

  return (
    <section className='flex flex-col gap-2'>
      <div className='text-muted-foreground flex justify-between font-mono text-[10px] tracking-widest uppercase'>
        <span>Timeline</span>
        <span className='tabular-nums'>
          {nodeRuns.length} {nodeRuns.length === 1 ? 'node run' : 'node runs'} · {formatDuration(spanMs)}
        </span>
      </div>
      {nodeRuns.length ? (
        <ol className='-mx-1.5 flex flex-col'>
          {nodeRuns.map((run, index) => (
            <RunTimelineRow
              key={run.id}
              run={run}
              name={nodeName(run.nodeId)}
              startMs={startMs}
              spanMs={spanMs}
              now={now}
              index={index}
              onSelect={() => focusNode(run.nodeId)}
            />
          ))}
        </ol>
      ) : (
        <span className='text-muted-foreground/70 rounded-lg border border-dashed px-3 py-2 font-mono text-[10px] tracking-widest uppercase'>
          No node has run yet
        </span>
      )}
    </section>
  );
};
