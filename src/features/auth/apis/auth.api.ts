import { AUTH_ENDPOINTS } from '../constants/auth.constants';
import { UnauthenticatedError } from '../errors/unauthenticated.error';
import { CurrentUser } from '../types/auth.types';

export const fetchCurrentUser = async (): Promise<CurrentUser> => {
  const response = await fetch(AUTH_ENDPOINTS.ME, { credentials: 'include' });
  if (response.status === 401) throw new UnauthenticatedError();
  if (!response.ok) throw new Error(`GET ${AUTH_ENDPOINTS.ME} failed with ${response.status}`);
  return response.json();
};

export const logout = async (): Promise<void> => {
  const response = await fetch(AUTH_ENDPOINTS.LOGOUT, { method: 'POST', credentials: 'include' });
  if (!response.ok) throw new Error(`POST ${AUTH_ENDPOINTS.LOGOUT} failed with ${response.status}`);
};
