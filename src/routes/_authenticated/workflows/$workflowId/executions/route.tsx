import { createFileRoute, SearchSchemaInput, stripSearchParams } from '@tanstack/react-router';

import {
  DEFAULT_EXECUTION_FILTERS,
  ExecutionFilters,
  ExecutionsPage,
  executionsQueryOptions,
  parseExecutionFilters,
} from '@/features/workflow-editor/public';
import { LoadingState } from '@/shared/components/public';

export const Route = createFileRoute('/_authenticated/workflows/$workflowId/executions')({
  // Every filter has a default, so links may leave any of them out.
  validateSearch: (search: Partial<ExecutionFilters> & SearchSchemaInput) => parseExecutionFilters(search),
  search: { middlewares: [stripSearchParams(DEFAULT_EXECUTION_FILTERS)] },
  loaderDeps: ({ search }) => search,
  loader: ({ context, params, deps }) => context.queryClient.ensureInfiniteQueryData(executionsQueryOptions(params.workflowId, deps)),
  pendingComponent: () => <LoadingState label='Loading run history' />,
  component: ExecutionsPage,
});
