import { FC } from 'react';

import { EditorBreadcrumb } from './editor-breadcrumb';
import { EditorStatus } from './editor-status';

import { WorkflowDetail } from '@/features/workflows/public';

interface EditorTopBarProps {
  workflow: WorkflowDetail;
}

export const EditorTopBar: FC<EditorTopBarProps> = ({ workflow }) => (
  <header className='animate-in fade-in slide-in-from-top-2 fill-mode-both flex h-14 shrink-0 items-center justify-between gap-6 border-b px-6 duration-500'>
    <EditorBreadcrumb workflow={workflow} />
    <EditorStatus versionNumber={workflow.version.number} />
  </header>
);
