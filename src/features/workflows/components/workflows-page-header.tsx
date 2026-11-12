import { FC } from 'react';
import { Plus } from 'lucide-react';

import { CreateWorkflowDialog } from './create-workflow-dialog';

import { Button } from '@/shared/components/ui/button';

export const WorkflowsPageHeader: FC = () => (
  <header className='mb-6 flex items-end justify-between border-b pb-6'>
    <div>
      <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>Workflow builder</span>
      <h1 className='mt-2 text-3xl font-semibold tracking-tight'>Workflows</h1>
    </div>
    <CreateWorkflowDialog>
      <Button>
        <Plus />
        New workflow
      </Button>
    </CreateWorkflowDialog>
  </header>
);
