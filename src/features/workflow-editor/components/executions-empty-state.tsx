import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, FilterX } from 'lucide-react';

import { RadarSweep } from './radar-sweep';
import { EXECUTIONS_POLL_INTERVAL } from '../constants/workflow-editor.constants';

import { CornerMarks } from '@/shared/components/public';
import { Button } from '@/shared/components/ui/button';

interface ExecutionsEmptyStateProps {
  workflowId: string;
  isFiltered: boolean;
}

export const ExecutionsEmptyState: FC<ExecutionsEmptyStateProps> = ({ workflowId, isFiltered }) => (
  <section className='bg-grid-glow relative flex flex-1 flex-col items-center justify-center overflow-hidden text-center'>
    <CornerMarks />
    <div aria-hidden className='animate-scan via-primary-soft/30 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent' />
    <div className='animate-in fade-in zoom-in-95 fill-mode-both duration-700'>
      <RadarSweep />
    </div>
    <span className='text-primary-soft animate-in fade-in slide-in-from-bottom-2 fill-mode-both mt-8 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase delay-150 duration-500'>
      <span className='bg-primary-soft size-1.5 animate-pulse rounded-full' />
      {isFiltered ? 'Filters active' : `Listening · checks every ${EXECUTIONS_POLL_INTERVAL / 1000}s`}
    </span>
    <h2 className='animate-in fade-in slide-in-from-bottom-2 fill-mode-both mt-3 text-3xl font-semibold tracking-tight delay-200 duration-500'>
      {isFiltered ? (
        'No runs match'
      ) : (
        <>
          No runs <span className='from-primary-soft to-primary bg-linear-to-r bg-clip-text text-transparent'>yet</span>
        </>
      )}
    </h2>
    <p className='text-muted-foreground animate-in fade-in slide-in-from-bottom-2 fill-mode-both mt-3 max-w-sm text-sm delay-300 duration-500'>
      {isFiltered
        ? "Nothing in this workflow's history matches these filters."
        : 'Runs from the editor, and from the trigger once the workflow is published, appear here as they start.'}
    </p>
    <Button
      asChild
      variant='outline'
      className='border-primary-soft/40 animate-in fade-in slide-in-from-bottom-2 fill-mode-both mt-8 delay-500 duration-500'>
      {isFiltered ? (
        <Link to='/workflows/$workflowId/executions' params={{ workflowId }} search={{}}>
          <FilterX />
          Clear filters
        </Link>
      ) : (
        <Link to='/workflows/$workflowId' params={{ workflowId }}>
          <ArrowLeft />
          Open editor
        </Link>
      )}
    </Button>
  </section>
);
