import { FC } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { FilterChips } from './filter-chips';
import { EXECUTION_MODE_FILTERS, EXECUTION_STATUS_FILTERS, EXECUTION_WINDOW_FILTERS } from '../constants/workflow-editor.constants';
import { useExecutionFilters } from '../hooks/use-execution-filters';
import { ExecutionFilters } from '../types/workflow-execution.types';
import { parseExecutionFilters } from '../utils/execution-filters';

export const ExecutionFiltersPanel: FC = () => {
  const filters = useExecutionFilters();
  const navigate = useNavigate();
  // Filtering keeps the open run on screen, even when it no longer matches.
  const setFilter = (key: keyof ExecutionFilters) => (value: string) =>
    void navigate({ to: '.', search: (previous) => parseExecutionFilters({ ...previous, [key]: value }), replace: true });

  return (
    <div className='flex flex-col gap-3 border-b px-4 pb-4'>
      <FilterChips label='Status' options={EXECUTION_STATUS_FILTERS} value={filters.status} onChange={setFilter('status')} />
      <FilterChips label='Trigger' options={EXECUTION_MODE_FILTERS} value={filters.mode} onChange={setFilter('mode')} />
      <FilterChips label='Started' options={EXECUTION_WINDOW_FILTERS} value={filters.window} onChange={setFilter('window')} />
    </div>
  );
};
