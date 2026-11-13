import { FINISHED_EXECUTION_STATUSES } from '../constants/workflow-editor.constants';
import { ExecutionStatus, NodeRun, NodeRunStatus } from '../types/workflow-execution.types';

export const isExecutionFinished = (status: ExecutionStatus): boolean => FINISHED_EXECUTION_STATUSES.includes(status);

// A paused execution isn't finished, but nothing runs until it resumes, so another run may start.
export const isExecutionBusy = (status: ExecutionStatus): boolean => status === 'QUEUED' || status === 'RUNNING';

export const countFinishedRuns = (runs: NodeRun[]): number => runs.filter((run) => run.status === 'SUCCEEDED' || run.status === 'FAILED').length;

// A node that ran several times shows its most urgent status: still running, paused, then failed.
export const summarizeNodeRunStatus = (runs: NodeRun[]): NodeRunStatus => {
  const statuses = runs.map(({ status }) => status);
  return (['RUNNING', 'WAITING', 'FAILED'] as const).find((candidate) => statuses.includes(candidate)) ?? 'SUCCEEDED';
};

// Time spent across all of a node's finished runs, e.g. every iteration of a loop body.
export const totalRunDuration = (runs: NodeRun[]): number =>
  runs.reduce((total, { startedAt, finishedAt }) => (finishedAt ? total + Date.parse(finishedAt) - Date.parse(startedAt) : total), 0);

export const groupRunsByNode = (runs: NodeRun[]): Map<string, NodeRun[]> => {
  const runsByNode = new Map<string, NodeRun[]>();
  for (const run of runs) runsByNode.set(run.nodeId, [...(runsByNode.get(run.nodeId) ?? []), run]);
  return runsByNode;
};
