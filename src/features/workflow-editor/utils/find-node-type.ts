import { WorkflowNodeType } from '../types/workflow-editor.types';

export const findNodeType = (nodeTypes: WorkflowNodeType[], type: string, version: number): WorkflowNodeType => {
  const nodeType = nodeTypes.find((candidate) => candidate.type === type && candidate.version === version);
  if (!nodeType) throw new Error(`Unknown node type ${type}@${version}`);
  return nodeType;
};
