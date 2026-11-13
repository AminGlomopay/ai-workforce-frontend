import {
  DEFAULT_EXECUTION_FILTERS,
  EXECUTION_MODE_FILTERS,
  EXECUTION_STATUS_FILTERS,
  EXECUTION_WINDOW_FILTERS,
  EXECUTIONS_PAGE_SIZE,
} from '../constants/workflow-editor.constants';
import { ExecutionFilters } from '../types/workflow-execution.types';

const pick = <T extends string>(options: Record<T, unknown>, value: unknown, fallback: T): T =>
  typeof value === 'string' && Object.hasOwn(options, value) ? (value as T) : fallback;

// Filters live in the URL, so anything hand-edited or stale falls back to its default.
export const parseExecutionFilters = (search: Record<string, unknown>): ExecutionFilters => ({
  status: pick(EXECUTION_STATUS_FILTERS, search.status, DEFAULT_EXECUTION_FILTERS.status),
  mode: pick(EXECUTION_MODE_FILTERS, search.mode, DEFAULT_EXECUTION_FILTERS.mode),
  window: pick(EXECUTION_WINDOW_FILTERS, search.window, DEFAULT_EXECUTION_FILTERS.window),
});

export const hasActiveFilters = (filters: ExecutionFilters): boolean =>
  (Object.keys(filters) as (keyof ExecutionFilters)[]).some((key) => filters[key] !== DEFAULT_EXECUTION_FILTERS[key]);

// The time window is measured from when the page is fetched, so a polled list keeps rolling forward.
export const toExecutionsSearchParams = ({ status, mode, window }: ExecutionFilters, cursor: string | null, now: number): URLSearchParams => {
  const params = new URLSearchParams({ limit: String(EXECUTIONS_PAGE_SIZE) });
  for (const value of EXECUTION_STATUS_FILTERS[status].statuses) params.append('status', value);
  for (const value of EXECUTION_MODE_FILTERS[mode].modes) params.append('mode', value);
  const windowMs = EXECUTION_WINDOW_FILTERS[window].ms;
  if (windowMs !== null) params.set('createdAfter', new Date(now - windowMs).toISOString());
  if (cursor !== null) params.set('cursor', cursor);
  return params;
};
