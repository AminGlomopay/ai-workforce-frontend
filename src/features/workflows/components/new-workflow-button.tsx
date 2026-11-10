import { FC } from 'react';
import { Plus } from 'lucide-react';

import { NewWorkflowDialog } from './new-workflow-dialog';

import { Button } from '@/shared/components/ui/button';

export const NewWorkflowButton: FC = () => (
  <NewWorkflowDialog>
    <Button className='ring-primary-soft/30 shadow-primary/50 bg-linear-to-b from-white/15 to-transparent px-4 shadow-[0_0_24px] ring-1'>
      <Plus />
      New workflow
    </Button>
  </NewWorkflowDialog>
);
