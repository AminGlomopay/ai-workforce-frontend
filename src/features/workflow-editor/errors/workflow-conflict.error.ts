export class WorkflowConflictError extends Error {
  readonly latestVersionNumber: number;

  constructor(latestVersionNumber: number) {
    super(`Version ${latestVersionNumber} was saved in another tab or by someone else after the version you're editing.`);
    this.name = 'WorkflowConflictError';
    this.latestVersionNumber = latestVersionNumber;
  }
}
