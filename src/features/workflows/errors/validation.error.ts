export type FieldErrors = Partial<Record<string, string[]>>;

export class ValidationError extends Error {
  readonly fieldErrors: FieldErrors;

  constructor(fieldErrors: FieldErrors) {
    super('Validation failed');
    this.name = 'ValidationError';
    this.fieldErrors = fieldErrors;
  }
}
