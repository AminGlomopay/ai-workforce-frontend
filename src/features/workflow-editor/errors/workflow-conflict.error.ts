export class WorkflowConflictError extends Error {
  constructor() {
    super('Someone saved this workflow after the version you are editing.');
    this.name = 'WorkflowConflictError';
  }
}
