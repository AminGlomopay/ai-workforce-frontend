import { describe, expect, it } from 'vitest';

import { countFinishedRuns, isExecutionBusy } from './execution-status';
import { NodeRun, NodeRunStatus } from '../types/workflow-execution.types';

const nodeRun = (status: NodeRunStatus, runIndex = 0): NodeRun => ({
  id: `run-${runIndex}`,
  nodeId: 'node-1',
  runIndex,
  iteration: null,
  status,
  error: null,
  startedAt: '2026-11-13T00:00:00.000Z',
  finishedAt: null,
});

describe('countFinishedRuns', () => {
  it('counts succeeded and failed runs', () => {
    expect(countFinishedRuns([nodeRun('SUCCEEDED', 0), nodeRun('FAILED', 1)])).toBe(2);
  });

  it('does not count running or waiting runs', () => {
    expect(countFinishedRuns([nodeRun('RUNNING', 0), nodeRun('WAITING', 1), nodeRun('SUCCEEDED', 2)])).toBe(1);
  });
});

describe('isExecutionBusy', () => {
  it('is busy while queued or running', () => {
    expect(isExecutionBusy('QUEUED')).toBe(true);
    expect(isExecutionBusy('RUNNING')).toBe(true);
  });

  it('is not busy while waiting or once finished', () => {
    expect(isExecutionBusy('WAITING')).toBe(false);
    expect(isExecutionBusy('SUCCEEDED')).toBe(false);
    expect(isExecutionBusy('CRASHED')).toBe(false);
  });
});
