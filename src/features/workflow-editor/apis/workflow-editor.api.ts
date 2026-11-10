import { WORKFLOW_EDITOR_ENDPOINTS } from '../constants/workflow-editor.constants';
import { InvalidWorkflowError } from '../errors/invalid-workflow.error';
import { WorkflowConflictError } from '../errors/workflow-conflict.error';
import { WorkflowHasIssuesError } from '../errors/workflow-has-issues.error';
import { WorkflowNotFoundError } from '../errors/workflow-not-found.error';
import { SaveWorkflowInput, ValidationErrorResponse, Workflow, WorkflowErrorResponse, WorkflowNodeType } from '../types/workflow-editor.types';
import { NodeRunDetail, WorkflowExecution, WorkflowExecutionDetail } from '../types/workflow-execution.types';

const throwWorkflowError = async (response: Response, request: string): Promise<never> => {
  const body: WorkflowErrorResponse = await response.json();
  if (body.errorCode === 'WORKFLOW_NOT_FOUND') throw new WorkflowNotFoundError();
  if (body.errorCode === 'WORKFLOW_VERSION_CONFLICT') throw new WorkflowConflictError();
  if (body.errorCode === 'INVALID_WORKFLOW_GRAPH') throw new InvalidWorkflowError(body.errors);
  if (body.errorCode === 'WORKFLOW_HAS_ISSUES') throw new WorkflowHasIssuesError(body.errors);
  if (body.errorCode === 'WORKFLOW_VERSION_NOT_FOUND') throw new Error('This version no longer exists. Reload the workflow and run it again.');
  throw new Error(`${request} failed with ${response.status}`);
};

export const fetchWorkflow = async (workflowId: string): Promise<Workflow> => {
  const url = WORKFLOW_EDITOR_ENDPOINTS.WORKFLOW(workflowId);
  const response = await fetch(url, { credentials: 'include' });
  if (response.status === 400) throw new WorkflowNotFoundError();
  if (!response.ok) await throwWorkflowError(response, `GET ${url}`);
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
  if (response.status === 400) {
    const { errors }: ValidationErrorResponse = await response.json();
    throw new InvalidWorkflowError(
      Object.entries(errors).flatMap(([field, fieldErrors]) => fieldErrors.map((fieldError) => `${field}: ${fieldError}`)),
    );
  }
  if (!response.ok) await throwWorkflowError(response, `PATCH ${url}`);
  return response.json();
};

export const fetchWorkflowNodeTypes = async (): Promise<WorkflowNodeType[]> => {
  const response = await fetch(WORKFLOW_EDITOR_ENDPOINTS.NODE_TYPES, { credentials: 'include' });
  if (!response.ok) throw new Error(`GET ${WORKFLOW_EDITOR_ENDPOINTS.NODE_TYPES} failed with ${response.status}`);
  const { nodeTypes } = await response.json();
  return nodeTypes;
};

export const startExecution = async (workflowId: string, versionId: string): Promise<WorkflowExecution> => {
  const url = WORKFLOW_EDITOR_ENDPOINTS.EXECUTIONS(workflowId);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ versionId }),
  });
  if (!response.ok) await throwWorkflowError(response, `POST ${url}`);
  return response.json();
};

export const fetchExecution = async (executionId: string): Promise<WorkflowExecutionDetail> => {
  const url = WORKFLOW_EDITOR_ENDPOINTS.EXECUTION(executionId);
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) throw new Error(`GET ${url} failed with ${response.status}`);
  return response.json();
};

export const fetchNodeRuns = async (executionId: string, nodeId: string): Promise<NodeRunDetail[]> => {
  const url = WORKFLOW_EDITOR_ENDPOINTS.NODE_RUNS(executionId, nodeId);
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) throw new Error(`GET ${url} failed with ${response.status}`);
  const { nodeRuns } = await response.json();
  return nodeRuns;
};
