import { FC } from 'react';
import { Link } from '@tanstack/react-router';

import { WorkflowDetail, WorkflowStatusBadge } from '@/features/workflows/public';

interface EditorBreadcrumbProps {
  workflow: WorkflowDetail;
}

export const EditorBreadcrumb: FC<EditorBreadcrumbProps> = ({ workflow }) => (
  <nav className='flex min-w-0 items-center gap-2.5'>
    <Link to='/workflows' className='text-muted-foreground hover:text-foreground font-mono text-xs'>
      Workflows
    </Link>
    <span className='text-muted-foreground/50 text-xs'>/</span>
    <h1 className='truncate text-sm font-semibold tracking-tight'>{workflow.name}</h1>
    <WorkflowStatusBadge activeVersionId={workflow.activeVersionId} />
    {workflow.description && <p className='text-muted-foreground ml-2 truncate text-xs'>{workflow.description}</p>}
  </nav>
);
