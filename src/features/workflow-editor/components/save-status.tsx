import { FC } from 'react';

import { cn } from '@/shared/utils/cn';

interface SaveStatusProps {
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  versionNumber: number;
}

export const SaveStatus: FC<SaveStatusProps> = ({ isSaving, hasUnsavedChanges, versionNumber }) => (
  <span className='text-muted-foreground animate-in fade-in slide-in-from-top-1 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase duration-500'>
    <span className={cn('size-1.5 rounded-full', hasUnsavedChanges ? 'bg-primary-soft animate-pulse' : 'bg-muted-foreground/60')} />
    {isSaving ? 'Saving…' : hasUnsavedChanges ? 'Unsaved changes' : `Saved · v${versionNumber}`}
  </span>
);
