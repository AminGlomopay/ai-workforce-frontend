import { describe, expect, it } from 'vitest';

import { countFinishedRuns, isExecutionBusy, summarizeNodeRunStatus, totalRunDuration } from './execution-status';
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

describe('summarizeNodeRunStatus', () => {
  it('prefers running, then paused, then failed', () => {
    expect(summarizeNodeRunStatus([nodeRun('SUCCEEDED'), nodeRun('FAILED'), nodeRun('WAITING')])).toBe('WAITING');
    expect(summarizeNodeRunStatus([nodeRun('SUCCEEDED'), nodeRun('FAILED')])).toBe('FAILED');
    expect(summarizeNodeRunStatus([nodeRun('SUCCEEDED')])).toBe('SUCCEEDED');
  });
});

describe('totalRunDuration', () => {
  it('adds up finished runs and skips unfinished ones', () => {
    const finished = { ...nodeRun('SUCCEEDED', 0), startedAt: '2026-11-13T00:00:00.000Z', finishedAt: '2026-11-13T00:00:01.500Z' };
    const again = { ...nodeRun('FAILED', 1), startedAt: '2026-11-13T00:00:02.000Z', finishedAt: '2026-11-13T00:00:02.250Z' };
    expect(totalRunDuration([finished, again, nodeRun('RUNNING', 2)])).toBe(1750);
  });
});
