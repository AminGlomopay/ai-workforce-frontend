import { describe, expect, it } from 'vitest';

import { groupExecutionsByDay } from './group-executions-by-day';
import { WorkflowExecutionSummary } from '../types/workflow-execution.types';

const execution = (id: string, createdAt: Date): WorkflowExecutionSummary => ({
  id,
  workflowId: 'workflow-1',
  workflowVersionId: 'version-1',
  mode: 'MANUAL',
  status: 'SUCCEEDED',
  triggerNodeId: 'node-1',
  error: null,
  startedAt: null,
  finishedAt: null,
  createdAt: createdAt.toISOString(),
  workflowVersion: { id: 'version-1', number: 1 },
  triggeredBy: null,
});

describe('groupExecutionsByDay', () => {
  it('groups consecutive runs by local day and names today and yesterday', () => {
    const now = new Date(2026, 10, 13, 15);
    const days = groupExecutionsByDay(
      [
        execution('a', new Date(2026, 10, 13, 14)),
        execution('b', new Date(2026, 10, 13, 9)),
        execution('c', new Date(2026, 10, 12, 23)),
        execution('d', new Date(2026, 10, 10, 8)),
      ],
      now,
    );

    expect(days.map(({ label, executions }) => [label, executions.map(({ id }) => id)])).toEqual([
      ['Today', ['a', 'b']],
      ['Yesterday', ['c']],
      [new Date(2026, 10, 10).toLocaleDateString(undefined, { dateStyle: 'medium' }), ['d']],
    ]);
  });
});
