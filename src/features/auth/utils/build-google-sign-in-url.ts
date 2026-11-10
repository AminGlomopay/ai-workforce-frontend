import { AUTH_ENDPOINTS } from '../constants/auth.constants';

export const buildGoogleSignInUrl = (returnTo: string) =>
  `${AUTH_ENDPOINTS.GOOGLE_SIGN_IN}?returnTo=${encodeURIComponent(`${window.location.origin}${returnTo}`)}`;
