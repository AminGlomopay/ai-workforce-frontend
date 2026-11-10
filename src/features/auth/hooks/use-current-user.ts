import { useSuspenseQuery } from '@tanstack/react-query';

import { currentUserQueryOptions } from '../apis/auth.queries';

export const useCurrentUser = () => useSuspenseQuery(currentUserQueryOptions).data;
