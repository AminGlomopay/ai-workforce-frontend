import { BACKEND_URL } from '@/shared/constants/backend.constants';

export const AUTH_ENDPOINTS = {
  ME: `${BACKEND_URL}/auth/me`,
  LOGOUT: `${BACKEND_URL}/auth/logout`,
  GOOGLE_SIGN_IN: `${BACKEND_URL}/auth/google?returnTo=/`,
};
