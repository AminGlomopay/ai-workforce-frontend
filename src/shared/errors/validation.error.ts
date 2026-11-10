import { BackendError } from './backend.error';

export type FieldErrors = Partial<Record<string, string[]>>;

export class ValidationError extends BackendError {
  fieldErrors: FieldErrors;

  constructor(fieldErrors: FieldErrors) {
    super('Validation failed', 400);
    this.name = 'ValidationError';
    this.fieldErrors = fieldErrors;
  }
}
