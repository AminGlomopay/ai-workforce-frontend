import { BackendError } from './backend.error';

export class UnauthenticatedError extends BackendError {
  constructor() {
    super('No active session', 401);
    this.name = 'UnauthenticatedError';
  }
}
