import { FC } from 'react';

import { ExecutionStatus } from '../types/workflow-execution.types';

import { cn } from '@/shared/utils/cn';

const ORB_CLASSES: Record<ExecutionStatus, string> = {
  QUEUED: 'border-primary-soft border bg-transparent',
  RUNNING: 'bg-primary-soft shadow-[0_0_10px_var(--primary-soft)]',
  WAITING: 'bg-primary-soft/70 animate-breathe',
  SUCCEEDED: 'bg-primary-soft shadow-[0_0_8px_var(--primary-soft)]',
  FAILED: 'bg-destructive shadow-[0_0_8px_var(--destructive)]',
  CRASHED: 'bg-destructive shadow-[0_0_8px_var(--destructive)]',
};

interface ExecutionStatusOrbProps {
  status: ExecutionStatus;
}

export const ExecutionStatusOrb: FC<ExecutionStatusOrbProps> = ({ status }) => (
  <span className='relative flex size-2 shrink-0'>
    {status === 'RUNNING' && <span className='bg-primary-soft absolute inset-0 animate-ping rounded-full opacity-60' />}
    <span className={cn('relative size-2 rounded-full', ORB_CLASSES[status])} />
  </span>
);
