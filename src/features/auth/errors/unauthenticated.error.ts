export class UnauthenticatedError extends Error {
  constructor() {
    super('No active session');
    this.name = 'UnauthenticatedError';
  }
}
