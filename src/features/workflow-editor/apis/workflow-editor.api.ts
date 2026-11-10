import { WORKFLOW_EDITOR_ENDPOINTS } from '../constants/workflow-editor.constants';
import { InvalidWorkflowError } from '../errors/invalid-workflow.error';
import { WorkflowConflictError } from '../errors/workflow-conflict.error';
import { WorkflowNotFoundError } from '../errors/workflow-not-found.error';
import { SaveWorkflowInput, Workflow, WorkflowNodeType } from '../types/workflow-editor.types';

export const fetchWorkflow = async (workflowId: string): Promise<Workflow> => {
  const url = WORKFLOW_EDITOR_ENDPOINTS.WORKFLOW(workflowId);
  const response = await fetch(url, { credentials: 'include' });
  if (response.status === 400 || response.status === 404) throw new WorkflowNotFoundError();
  if (!response.ok) throw new Error(`GET ${url} failed with ${response.status}`);
  return response.json();
};

export const saveWorkflow = async (workflowId: string, input: SaveWorkflowInput): Promise<Workflow> => {
  const url = WORKFLOW_EDITOR_ENDPOINTS.WORKFLOW(workflowId);
  const response = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (response.status === 400) throw new InvalidWorkflowError(await response.json());
  if (response.status === 404) throw new WorkflowNotFoundError();
  if (response.status === 409) throw new WorkflowConflictError((await response.json()).latestVersionNumber);
  if (!response.ok) throw new Error(`PATCH ${url} failed with ${response.status}`);
  return response.json();
};

export const fetchWorkflowNodeTypes = async (): Promise<WorkflowNodeType[]> => {
  const response = await fetch(WORKFLOW_EDITOR_ENDPOINTS.NODE_TYPES, { credentials: 'include' });
  if (!response.ok) throw new Error(`GET ${WORKFLOW_EDITOR_ENDPOINTS.NODE_TYPES} failed with ${response.status}`);
  const { nodeTypes } = await response.json();
  return nodeTypes;
};
