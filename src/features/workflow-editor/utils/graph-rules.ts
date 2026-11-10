import { LOOP_BODY_OUTPUT } from '../constants/workflow-editor.constants';

interface GraphEdge {
  source: string;
  sourceHandle?: string | null;
  target: string;
}

export const reachableFrom = (edges: GraphEdge[], startIds: string[]): Set<string> => {
  const reached = new Set<string>();
  const stack = [...startIds];
  for (let nodeId = stack.pop(); nodeId !== undefined; nodeId = stack.pop()) {
    if (reached.has(nodeId)) continue;
    reached.add(nodeId);
    stack.push(...edges.filter((edge) => edge.source === nodeId).map((edge) => edge.target));
  }
  return reached;
};

const isLoopBodyEdge = (edge: GraphEdge, loopId: string): boolean => edge.source === loopId && edge.sourceHandle === LOOP_BODY_OUTPUT;

export const findLoopBody = (edges: GraphEdge[], loopId: string): Set<string> =>
  reachableFrom(
    edges,
    edges.filter((edge) => isLoopBodyEdge(edge, loopId)).map((edge) => edge.target),
  );

// Mirrors the backend run check: a body node may only be fed from inside its loop or by the loop's body output.
const findLoopBodyViolations = (edges: GraphEdge[], loopIds: string[]): string[] =>
  loopIds.flatMap((loopId) => {
    const body = findLoopBody(edges, loopId);
    return edges
      .filter((edge) => body.has(edge.target) && !body.has(edge.source) && !isLoopBodyEdge(edge, loopId))
      .map((edge) => `${loopId}->${edge.target}`);
  });

export const findConnectionBlocker = (edges: GraphEdge[], connection: GraphEdge, loopIds: string[]): string | undefined => {
  if (reachableFrom(edges, [connection.target]).has(connection.source)) return 'This would create a cycle. Use a Loop node to repeat steps.';
  const existing = new Set(findLoopBodyViolations(edges, loopIds));
  if (findLoopBodyViolations([...edges, connection], loopIds).some((violation) => !existing.has(violation)))
    return 'A node inside a loop can only be fed from within that loop.';
  return undefined;
};

// Nested loops share iteration numbers, so the count comes from the innermost loop around the node.
export const countLoopIterations = (edges: GraphEdge[], loopIds: string[], nodeId: string, runs: { nodeId: string; iteration: number | null }[]) => {
  const bodies = loopIds.map((loopId) => findLoopBody(edges, loopId)).filter((body) => body.has(nodeId));
  const innermost = bodies.reduce<Set<string> | undefined>((smallest, body) => (!smallest || body.size < smallest.size ? body : smallest), undefined);
  if (!innermost) return 0;
  return new Set(runs.filter((run) => innermost.has(run.nodeId) && run.iteration !== null).map((run) => run.iteration)).size;
};
