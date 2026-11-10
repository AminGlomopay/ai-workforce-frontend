export class WorkflowNotFoundError extends Error {
  constructor() {
    super('Workflow not found');
    this.name = 'WorkflowNotFoundError';
  }
}
