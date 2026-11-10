import { FC } from 'react';

export const EditorStatus: FC = () => (
  <span className='text-muted-foreground flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase'>
    <span className='bg-primary-soft size-1.5 animate-pulse rounded-full' />
    Not saved · 0 nodes
  </span>
);
