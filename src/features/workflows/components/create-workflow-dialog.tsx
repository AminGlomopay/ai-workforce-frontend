import { FC, ReactNode } from 'react';

import { useCreateWorkflow } from '../hooks/use-create-workflow';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

interface CreateWorkflowDialogProps {
  children: ReactNode;
}

export const CreateWorkflowDialog: FC<CreateWorkflowDialogProps> = ({ children }) => {
  const { mutate: createWorkflow, isPending } = useCreateWorkflow();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form className='grid gap-4' action={(formData) => createWorkflow({ name: String(formData.get('name')) })}>
          <DialogHeader>
            <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>New workflow</span>
            <DialogTitle>Name your workflow</DialogTitle>
            <DialogDescription>You'll land on an empty canvas, ready for a trigger.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-2'>
            <Label htmlFor='workflow-name'>Name</Label>
            <Input id='workflow-name' name='name' required maxLength={200} autoFocus placeholder='Sync new merchants' />
          </div>
          <DialogFooter>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Creating…' : 'Create workflow'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
