import { FC } from 'react';
import { Crosshair } from 'lucide-react';

import { useFocusNode } from '../hooks/use-focus-node';
import { WorkflowVersion } from '../types/workflow-editor.types';
import { ExecutionError, ExecutionStatus } from '../types/workflow-execution.types';

import { Button } from '@/shared/components/ui/button';

interface RunErrorCardProps {
  status: ExecutionStatus;
  error: ExecutionError;
  version: WorkflowVersion;
}

export const RunErrorCard: FC<RunErrorCardProps> = ({ status, error, version }) => {
  const focusNode = useFocusNode();
  const { nodeId } = error;
  // The recorded name survives later renames; runs from before it was recorded fall back to the version's graph.
  const nodeName = error.nodeName ?? version.nodes.find(({ id }) => id === nodeId)?.name;

  return (
    <section className='border-destructive/40 bg-destructive/5 shadow-destructive/20 animate-in fade-in flex flex-col gap-2 rounded-lg border p-3 shadow-[0_0_24px]'>
      <div className='flex items-center justify-between gap-2'>
        <span className='text-destructive font-mono text-[10px] tracking-widest uppercase'>
          {status === 'CRASHED' ? 'Crashed' : 'Failed'}
          {nodeName && ` at ${nodeName}`}
        </span>
        {nodeId && (
          <Button variant='ghost' size='xs' className='text-muted-foreground hover:text-foreground' onClick={() => focusNode(nodeId)}>
            <Crosshair />
            Show node
          </Button>
        )}
      </div>
      <p className='text-xs leading-snug wrap-break-word whitespace-pre-wrap'>{error.message}</p>
    </section>
  );
};
