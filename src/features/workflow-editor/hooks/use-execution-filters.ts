import { useSearch } from '@tanstack/react-router';

export const useExecutionFilters = () => useSearch({ from: '/_authenticated/workflows/$workflowId/executions' });
