import { WORKFLOWS_ENDPOINT } from '../constants/workflows.constants';
import { CreateWorkflowInput, WorkflowSummary } from '../types/workflows.types';

export const fetchWorkflows = async (): Promise<WorkflowSummary[]> => {
  const response = await fetch(WORKFLOWS_ENDPOINT, { credentials: 'include' });
  if (!response.ok) throw new Error(`GET ${WORKFLOWS_ENDPOINT} failed with ${response.status}`);
  const { workflows } = await response.json();
  return workflows;
};

export const createWorkflow = async (input: CreateWorkflowInput): Promise<WorkflowSummary> => {
  const response = await fetch(WORKFLOWS_ENDPOINT, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`POST ${WORKFLOWS_ENDPOINT} failed with ${response.status}`);
  return response.json();
};
