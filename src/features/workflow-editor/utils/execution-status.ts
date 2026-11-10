import { FINISHED_EXECUTION_STATUSES } from '../constants/workflow-editor.constants';
import { ExecutionStatus, NodeRun } from '../types/workflow-execution.types';

export const isExecutionFinished = (status: ExecutionStatus): boolean => FINISHED_EXECUTION_STATUSES.includes(status);

export const countFinishedRuns = (runs: NodeRun[]): number => runs.filter((run) => run.status !== 'RUNNING').length;

export const groupRunsByNode = (runs: NodeRun[]): Map<string, NodeRun[]> => {
  const runsByNode = new Map<string, NodeRun[]>();
  for (const run of runs) runsByNode.set(run.nodeId, [...(runsByNode.get(run.nodeId) ?? []), run]);
  return runsByNode;
};
