import { WORKFLOWS_ENDPOINTS } from '../constants/workflows.constants';
import { CreateWorkflowInput, WorkflowDetail, WorkflowsResponse } from '../types/workflows.types';

import { requestBackend } from '@/shared/apis/request-backend';

export const fetchWorkflows = async (): Promise<WorkflowsResponse> => (await requestBackend(WORKFLOWS_ENDPOINTS.WORKFLOWS)).json();

export const fetchWorkflow = async (id: string): Promise<WorkflowDetail> => (await requestBackend(WORKFLOWS_ENDPOINTS.WORKFLOW(id))).json();

export const createWorkflow = async (input: CreateWorkflowInput): Promise<WorkflowDetail> =>
  (
    await requestBackend(WORKFLOWS_ENDPOINTS.WORKFLOWS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
  ).json();
