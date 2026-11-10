import { queryOptions } from '@tanstack/react-query';

import { AUTH_QUERY_KEYS } from '../constants/auth.constants';
import { fetchCurrentUser } from './auth.api';

export const currentUserQueryOptions = queryOptions({
  queryKey: AUTH_QUERY_KEYS.CURRENT_USER,
  queryFn: fetchCurrentUser,
});
