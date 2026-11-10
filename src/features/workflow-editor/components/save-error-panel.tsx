import { FC } from 'react';
import { RotateCcw } from 'lucide-react';

import { EditorAlert } from './editor-alert';
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
    <EditorAlert title={error instanceof WorkflowConflictError ? 'Saved elsewhere' : 'Not saved'}>
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
    </EditorAlert>
  );
};
