export interface WorkflowSummary {
  id: string;
  name: string;
  description: string | null;
  latestVersion: number;
  activeVersionId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowVersion {
  id: string;
  number: number;
  nodes: unknown;
  connections: unknown;
  settings: unknown;
  createdAt: string;
}

export interface WorkflowDetail extends WorkflowSummary {
  testData: unknown;
  version: WorkflowVersion;
}

export interface WorkflowsResponse {
  workflows: WorkflowSummary[];
}

export interface CreateWorkflowInput {
  name: string;
  description?: string;
}
