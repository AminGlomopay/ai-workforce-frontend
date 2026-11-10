import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { logout } from '../apis/auth.api';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await navigate({ to: '/login' });
      queryClient.clear();
    },
    throwOnError: true,
  });
};
