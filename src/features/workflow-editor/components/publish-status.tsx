import { FC } from 'react';

import { cn } from '@/shared/utils/cn';

interface PublishStatusProps {
  activeVersionId: string | null;
  versionId: string;
}

export const PublishStatus: FC<PublishStatusProps> = ({ activeVersionId, versionId }) => (
  <span className='text-muted-foreground animate-in fade-in slide-in-from-top-1 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase duration-500'>
    <span className='relative flex size-1.5'>
      {activeVersionId && <span className='bg-primary-soft absolute inset-0 animate-ping rounded-full opacity-60' />}
      <span
        className={cn(
          'relative size-1.5 rounded-full',
          activeVersionId ? 'bg-primary-soft shadow-[0_0_8px_var(--primary-soft)]' : 'bg-muted-foreground/60',
        )}
      />
    </span>
    {activeVersionId === null ? (
      'Not published'
    ) : activeVersionId === versionId ? (
      <span className='text-foreground'>Published</span>
    ) : (
      <span>
        <span className='text-foreground'>Published</span>, with unpublished changes
      </span>
    )}
  </span>
);
