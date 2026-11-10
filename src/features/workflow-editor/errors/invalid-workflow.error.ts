import { InvalidWorkflowResponse } from '../types/workflow-editor.types';

export class InvalidWorkflowError extends Error {
  readonly messages: string[];

  constructor({ message, errors }: InvalidWorkflowResponse) {
    super(message);
    this.name = 'InvalidWorkflowError';
    this.messages = Array.isArray(errors)
      ? errors
      : Object.entries(errors).flatMap(([field, fieldErrors]) => fieldErrors.map((fieldError) => `${field}: ${fieldError}`));
  }
}
