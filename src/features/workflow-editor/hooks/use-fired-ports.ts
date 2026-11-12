import { useQueries } from '@tanstack/react-query';

import { nodeRunsQueryOptions } from '../apis/workflow-editor.queries';
import { NodeRun, NodeRunDetail } from '../types/workflow-execution.types';

const toFiredPorts = (nodeRuns: NodeRunDetail[]): string[] =>
  nodeRuns.flatMap(({ nodeId, output }) => (output ?? []).flatMap((data, port) => (data ? [`${nodeId}:${port}`] : [])));

// Outputs only come with each node's run details, so once the run finishes every node that ran is fetched.
export const useFiredPorts = (executionId: string | null, runsByNode: Map<string, NodeRun[]>, isFinished: boolean) =>
  useQueries({
    queries: [...runsByNode].map(([nodeId, runs]) => ({
      ...nodeRunsQueryOptions(executionId ?? '', nodeId, runs),
      enabled: isFinished,
    })),
    combine: (results) =>
      isFinished && results.every(({ data }) => data) ? new Set(results.flatMap(({ data }) => (data ? toFiredPorts(data) : []))) : undefined,
  });
