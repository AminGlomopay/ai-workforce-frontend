import { FC } from 'react';
import { ErrorComponentProps, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

import { WorkflowNotFoundError } from '../errors/workflow-not-found.error';

import { Button } from '@/shared/components/ui/button';

export const WorkflowNotFoundPage: FC<ErrorComponentProps> = ({ error }) => {
  if (!(error instanceof WorkflowNotFoundError)) throw error;

  return (
    <div className='flex h-dvh flex-col items-center justify-center text-center'>
      <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>404 · No signal</span>
      <h1 className='mt-3 text-3xl font-semibold tracking-tight'>Workflow not found</h1>
      <p className='text-muted-foreground mt-3 max-w-sm text-sm'>It doesn't exist, was deleted, or belongs to someone else.</p>
      <Button asChild variant='outline' className='mt-8'>
        <Link to='/workflows'>
          <ArrowLeft />
          Back to workflows
        </Link>
      </Button>
    </div>
  );
};
