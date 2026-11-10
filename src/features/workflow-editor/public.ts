import { lazy } from 'react';

// Lazy so the route loader can import the queries below without pulling React Flow into the main bundle.
export const WorkflowEditorPage = lazy(() =>
  import('./pages/workflow-editor-page').then(({ WorkflowEditorPage }) => ({ default: WorkflowEditorPage })),
);
export { WorkflowNotFoundPage } from './pages/workflow-not-found-page';
export { workflowNodeTypesQueryOptions, workflowQueryOptions } from './apis/workflow-editor.queries';
