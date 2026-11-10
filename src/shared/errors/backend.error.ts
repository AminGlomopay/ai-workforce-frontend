export class BackendError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'BackendError';
    this.status = status;
  }
}
