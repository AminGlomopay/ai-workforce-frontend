import { BackendError } from '../errors/backend.error';
import { UnauthenticatedError } from '../errors/unauthenticated.error';
import { ValidationError } from '../errors/validation.error';

export const requestBackend = async (url: string, init?: RequestInit): Promise<Response> => {
  const response = await fetch(url, { ...init, credentials: 'include' });
  if (response.ok) return response;
  if (response.status === 401) throw new UnauthenticatedError();
  if (response.status === 400) throw new ValidationError((await response.json()).errors);
  throw new BackendError(`${init?.method ?? 'GET'} ${url} failed with ${response.status}`, response.status);
};
