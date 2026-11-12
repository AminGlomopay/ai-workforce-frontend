import { FC, FormEvent } from 'react';

import { WORKFLOW_DESCRIPTION_MAX_LENGTH, WORKFLOW_NAME_MAX_LENGTH } from '../constants/workflows.constants';
import { ValidationError } from '../errors/validation.error';
import { useCreateWorkflow } from '../hooks/use-create-workflow';

import { PulseSpinner } from '@/shared/components/public';
import { Button } from '@/shared/components/ui/button';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { cn } from '@/shared/utils/cn';

export const CreateWorkflowForm: FC = () => {
  const { mutate: createWorkflow, isPending, error } = useCreateWorkflow();
  const fieldErrors = error instanceof ValidationError ? error.fieldErrors : {};

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    createWorkflow({ name: String(formData.get('name')), description: String(formData.get('description')) || undefined });
  };

  return (
    <form className='grid gap-4' onSubmit={handleSubmit}>
      <DialogHeader>
        <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>New workflow</span>
        <DialogTitle>Name your workflow</DialogTitle>
        <DialogDescription>You'll land on an empty canvas, ready for a trigger.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-2'>
        <Label htmlFor='workflow-name'>Name</Label>
        <Input
          id='workflow-name'
          name='name'
          required
          maxLength={WORKFLOW_NAME_MAX_LENGTH}
          autoFocus
          placeholder='Tag new Zoho Desk tickets'
          aria-invalid={!!fieldErrors.name}
        />
        {fieldErrors.name && <p className='text-destructive text-xs'>{fieldErrors.name[0]}</p>}
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='workflow-description'>
          Description <span className='text-muted-foreground font-normal'>(optional)</span>
        </Label>
        <Textarea
          id='workflow-description'
          name='description'
          rows={3}
          maxLength={WORKFLOW_DESCRIPTION_MAX_LENGTH}
          placeholder='What this workflow does and when it runs.'
          aria-invalid={!!fieldErrors.description}
        />
        {fieldErrors.description && <p className='text-destructive text-xs'>{fieldErrors.description[0]}</p>}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant='ghost'>Cancel</Button>
        </DialogClose>
        <Button
          type='submit'
          disabled={isPending}
          aria-busy={isPending}
          className={cn(
            'ring-primary-soft/30 shadow-primary/50 shadow-[0_0_24px] ring-1',
            isPending && 'border-beam before:[animation-duration:1.2s] disabled:opacity-100',
          )}>
          {isPending ? (
            <>
              <PulseSpinner />
              Creating…
            </>
          ) : (
            'Create workflow'
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};
