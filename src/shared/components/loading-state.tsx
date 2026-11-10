import { FC } from 'react';

interface LoadingStateProps {
  label: string;
}

export const LoadingState: FC<LoadingStateProps> = ({ label }) => (
  <div className='text-muted-foreground flex h-dvh items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase'>
    <span className='bg-primary-soft size-1.5 animate-pulse rounded-full' />
    {label}
  </div>
);
