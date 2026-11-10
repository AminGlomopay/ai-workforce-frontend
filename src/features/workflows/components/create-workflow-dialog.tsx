import { FC, ReactNode } from 'react';

import { CreateWorkflowForm } from './create-workflow-form';

import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';

interface CreateWorkflowDialogProps {
  children: ReactNode;
}

export const CreateWorkflowDialog: FC<CreateWorkflowDialogProps> = ({ children }) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent>
      <CreateWorkflowForm />
    </DialogContent>
  </Dialog>
);
