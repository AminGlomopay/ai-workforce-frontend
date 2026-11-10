export interface WorkflowSummary {
  id: string;
  name: string;
  description: string | null;
  latestVersion: number;
  activeVersionId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkflowInput {
  name: string;
  description?: string;
}
