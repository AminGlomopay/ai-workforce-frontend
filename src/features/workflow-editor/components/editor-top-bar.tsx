import { FC } from 'react';

import { EditorBreadcrumb } from './editor-breadcrumb';
import { EditorStatus } from './editor-status';

export const EditorTopBar: FC = () => (
  <header className='animate-in fade-in slide-in-from-top-2 fill-mode-both flex h-14 shrink-0 items-center justify-between border-b px-6 duration-500'>
    <EditorBreadcrumb />
    <EditorStatus />
  </header>
);
