import { FC } from 'react';

export const ExecutionReplayLoading: FC = () => (
  <div className='bg-canvas-glow text-muted-foreground flex flex-1 items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase'>
    <span className='bg-primary-soft size-1.5 animate-pulse rounded-full' />
    Loading run
  </div>
);
