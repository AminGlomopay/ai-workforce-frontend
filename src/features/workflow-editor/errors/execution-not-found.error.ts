export class ExecutionNotFoundError extends Error {
  constructor() {
    super('Run not found');
    this.name = 'ExecutionNotFoundError';
  }
}
