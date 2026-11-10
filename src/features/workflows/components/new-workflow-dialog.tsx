import { FC, ReactNode } from 'react';

import { NewWorkflowForm } from './new-workflow-form';

import { CornerMarks } from '@/shared/components/public';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';

interface NewWorkflowDialogProps {
  children: ReactNode;
}

export const NewWorkflowDialog: FC<NewWorkflowDialogProps> = ({ children }) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent
      showCloseButton={false}
      className='bg-grid-glow border-primary/25 shadow-primary/20 gap-6 border p-7 shadow-[0_0_80px] sm:max-w-lg'>
      <CornerMarks />
      <DialogHeader>
        <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>Workflows</span>
        <DialogTitle className='text-2xl font-semibold tracking-tight'>New workflow</DialogTitle>
        <DialogDescription>Name it here. You build the graph in the editor next.</DialogDescription>
      </DialogHeader>
      <NewWorkflowForm />
    </DialogContent>
  </Dialog>
);
