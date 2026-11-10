import { AUTH_ENDPOINTS } from '../constants/auth.constants';
import { CurrentUser } from '../types/auth.types';

import { requestBackend } from '@/shared/apis/request-backend';

export const fetchCurrentUser = async (): Promise<CurrentUser> => (await requestBackend(AUTH_ENDPOINTS.ME)).json();

export const logout = async (): Promise<void> => {
  await requestBackend(AUTH_ENDPOINTS.LOGOUT, { method: 'POST' });
};
