import { FC } from 'react';
import { Plus } from 'lucide-react';

import { CreateWorkflowDialog } from './create-workflow-dialog';

import { Button } from '@/shared/components/ui/button';

export const NoWorkflowsMessage: FC = () => (
  <div className='mt-14 flex flex-col items-center text-center'>
    <h2 className='text-3xl font-semibold tracking-tight'>
      No <span className='from-foreground to-primary-soft bg-linear-to-r bg-clip-text text-transparent'>workflows yet</span>
    </h2>
    <p className='text-muted-foreground mt-4 max-w-md text-sm leading-relaxed'>
      Drop a trigger on the canvas, wire nodes to it, and switch the workflow on. Every matching event runs the whole graph.
    </p>
    <CreateWorkflowDialog>
      <Button
        size='lg'
        className='ring-primary-soft/30 shadow-primary/60 mt-8 h-10 bg-linear-to-b from-white/15 to-transparent px-5 shadow-[0_0_32px] ring-1'>
        <Plus />
        Create your first workflow
      </Button>
    </CreateWorkflowDialog>
  </div>
);
