import { lazy } from 'react';

// Lazy so the route loader can import the queries below without pulling React Flow into the main bundle.
export const WorkflowEditorPage = lazy(() =>
  import('./pages/workflow-editor-page').then(({ WorkflowEditorPage }) => ({ default: WorkflowEditorPage })),
);
export const ExecutionReplayPage = lazy(() =>
  import('./pages/execution-replay-page').then(({ ExecutionReplayPage }) => ({ default: ExecutionReplayPage })),
);
export { ExecutionsPage } from './pages/executions-page';
export { ExecutionsIndexPage } from './pages/executions-index-page';
export { WorkflowNotFoundPage } from './pages/workflow-not-found-page';
export { ExecutionNotFoundPane } from './components/execution-not-found-pane';
export { ExecutionReplayLoading } from './components/execution-replay-loading';
export { ExecutionNotFoundError } from './errors/execution-not-found.error';
export { DEFAULT_EXECUTION_FILTERS } from './constants/workflow-editor.constants';
export { parseExecutionFilters } from './utils/execution-filters';
export type { ExecutionFilters } from './types/workflow-execution.types';
export {
  executionQueryOptions,
  executionsQueryOptions,
  workflowNodeTypesQueryOptions,
  workflowQueryOptions,
  workflowVersionQueryOptions,
} from './apis/workflow-editor.queries';
