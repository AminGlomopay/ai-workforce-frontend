import { getRouteApi } from '@tanstack/react-router';

const authenticatedRoute = getRouteApi('/_authenticated');

export const useCurrentUser = () => authenticatedRoute.useRouteContext().user;
