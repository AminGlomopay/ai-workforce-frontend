import { FC } from 'react';

export const RunDataLoading: FC = () => (
  <span className='text-muted-foreground flex animate-pulse items-center gap-2 font-mono text-[10px] tracking-widest uppercase'>
    <span className='bg-primary-soft size-1.5 rounded-full' />
    Loading run data…
  </span>
);
