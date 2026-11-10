export class InvalidWorkflowError extends Error {
  readonly messages: string[];

  constructor(messages: string[]) {
    super('Invalid workflow');
    this.name = 'InvalidWorkflowError';
    this.messages = messages;
  }
}
