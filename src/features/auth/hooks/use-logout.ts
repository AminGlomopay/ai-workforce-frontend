import { useNavigate } from '@tanstack/react-router';

import { logout } from '../apis/auth.api';

export const useLogout = () => {
  const navigate = useNavigate();

  return async () => {
    await logout();
    await navigate({ to: '/login' });
  };
};
