import { FC } from 'react';
import { RotateCcw, TriangleAlert } from 'lucide-react';

import { InvalidWorkflowError } from '../errors/invalid-workflow.error';
import { WorkflowConflictError } from '../errors/workflow-conflict.error';
import { useReloadWorkflow } from '../hooks/use-reload-workflow';

import { Button } from '@/shared/components/ui/button';

interface SaveErrorPanelProps {
  workflowId: string;
  error: Error;
  onReloaded: () => void;
}

export const SaveErrorPanel: FC<SaveErrorPanelProps> = ({ workflowId, error, onReloaded }) => {
  const { mutate: reload, isPending } = useReloadWorkflow(workflowId);
  const messages = error instanceof InvalidWorkflowError ? error.messages : [error.message];

  return (
    <div
      role='alert'
      className='bg-popover border-destructive/40 animate-in fade-in slide-in-from-top-1 absolute top-full right-6 z-10 mt-2 flex w-96 flex-col gap-3 rounded-lg border p-4 shadow-xl'>
      <span className='text-destructive flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase'>
        <TriangleAlert className='size-3.5' />
        {error instanceof WorkflowConflictError ? 'Saved elsewhere' : 'Not saved'}
      </span>
      <ul className='flex flex-col gap-1 text-xs leading-snug'>
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
      {error instanceof WorkflowConflictError && (
        <>
          <p className='text-muted-foreground text-xs leading-snug'>Reloading discards your unsaved changes on this canvas.</p>
          <Button
            variant='outline'
            size='sm'
            className='self-start'
            disabled={isPending}
            onClick={() => reload(undefined, { onSuccess: onReloaded })}>
            <RotateCcw />
            Reload latest
          </Button>
        </>
      )}
    </div>
  );
};
