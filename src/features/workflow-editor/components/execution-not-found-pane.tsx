import { FC } from 'react';
import { ErrorComponentProps } from '@tanstack/react-router';

import { ExecutionNotFoundError } from '../errors/execution-not-found.error';

export const ExecutionNotFoundPane: FC<ErrorComponentProps> = ({ error }) => {
  if (!(error instanceof ExecutionNotFoundError)) throw error;

  return (
    <div className='bg-canvas-glow flex flex-1 flex-col items-center justify-center text-center'>
      <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>404 · No signal</span>
      <h2 className='mt-3 text-3xl font-semibold tracking-tight'>Run not found</h2>
      <p className='text-muted-foreground mt-3 max-w-sm text-sm'>It doesn't exist or belongs to another workflow. Pick a run from the history.</p>
    </div>
  );
};
