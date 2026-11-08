import { FC } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

export const NoWorkflowsMessage: FC = () => (
  <div className='mt-14 flex flex-col items-center text-center'>
    <h2 className='text-3xl font-semibold tracking-tight'>
      No workflows <span className='text-primary-soft'>yet</span>
    </h2>
    <p className='text-muted-foreground mt-4 max-w-md text-sm leading-relaxed'>
      Save a prompt once and the agent picks it up every time a matching event arrives. Nothing is listening until you create one.
    </p>
    <Button size='lg' className='shadow-primary/50 mt-8 h-10 px-5 shadow-lg'>
      <Plus />
      Create your first workflow
    </Button>
  </div>
);
