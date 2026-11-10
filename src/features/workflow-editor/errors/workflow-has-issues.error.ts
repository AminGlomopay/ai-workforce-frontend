export class WorkflowHasIssuesError extends Error {
  readonly messages: string[];

  constructor(messages: string[]) {
    super('The workflow has issues');
    this.name = 'WorkflowHasIssuesError';
    this.messages = messages;
  }
}
