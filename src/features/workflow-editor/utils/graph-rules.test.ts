import { describe, expect, it } from 'vitest';

import { countLoopIterations, findConnectionBlocker, findLoopBody } from './graph-rules';

const edge = (source: string, target: string, sourceHandle = '0') => ({ source, sourceHandle, target });

describe('findConnectionBlocker', () => {
  it('allows an edge that keeps the graph acyclic', () => {
    expect(findConnectionBlocker([edge('trigger', 'a')], edge('a', 'b'), [])).toBeUndefined();
  });

  it('blocks a self connection', () => {
    expect(findConnectionBlocker([], edge('a', 'a'), [])).toMatch(/cycle/);
  });

  it('blocks a back edge', () => {
    expect(findConnectionBlocker([edge('a', 'b'), edge('b', 'c')], edge('c', 'a'), [])).toMatch(/cycle/);
  });

  it('blocks feeding a loop body node from outside the loop', () => {
    const edges = [edge('trigger', 'loop'), edge('loop', 'slack', '0')];

    expect(findConnectionBlocker(edges, edge('trigger', 'slack'), ['loop'])).toMatch(/inside a loop/);
  });

  it('blocks pulling a node fed from outside into a loop body', () => {
    const edges = [edge('trigger', 'loop'), edge('trigger', 'slack')];

    expect(findConnectionBlocker(edges, edge('loop', 'slack', '0'), ['loop'])).toMatch(/inside a loop/);
  });

  it('blocks joining a loop body with the done branch', () => {
    const edges = [edge('trigger', 'loop'), edge('loop', 'slack', '0'), edge('loop', 'final', '1')];

    expect(findConnectionBlocker(edges, edge('slack', 'final'), ['loop'])).toMatch(/inside a loop/);
  });

  it('allows edges within a loop body and from the done branch onward', () => {
    const edges = [edge('trigger', 'loop'), edge('loop', 'if', '0'), edge('loop', 'final', '1')];

    expect(findConnectionBlocker(edges, edge('if', 'slack', '1'), ['loop'])).toBeUndefined();
    expect(findConnectionBlocker(edges, edge('final', 'notify'), ['loop'])).toBeUndefined();
  });
});

describe('findLoopBody', () => {
  it('collects everything reachable from the body output only', () => {
    const edges = [edge('loop', 'if', '0'), edge('if', 'slack', '1'), edge('loop', 'final', '1')];

    expect(findLoopBody(edges, 'loop')).toEqual(new Set(['if', 'slack']));
  });
});

describe('countLoopIterations', () => {
  it('counts the iterations of the loop around the node, even ones the node skipped', () => {
    const edges = [edge('loop', 'if', '0'), edge('if', 'slack', '0')];
    const runs = [
      { nodeId: 'loop', iteration: null },
      { nodeId: 'if', iteration: 0 },
      { nodeId: 'slack', iteration: 0 },
      { nodeId: 'if', iteration: 1 },
      { nodeId: 'if', iteration: 2 },
      { nodeId: 'slack', iteration: 2 },
    ];

    expect(countLoopIterations(edges, ['loop'], 'slack', runs)).toBe(3);
  });
});
