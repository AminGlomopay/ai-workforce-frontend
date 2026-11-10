import { FC, FormEvent, useState } from 'react';
import { z } from 'zod';

import { useCreateWorkflow } from '../hooks/use-create-workflow';
import { createWorkflowSchema } from '../schemas/create-workflow.schema';

import { LoadingButton } from '@/shared/components/public';
import { Button } from '@/shared/components/ui/button';
import { DialogClose } from '@/shared/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { FieldErrors, ValidationError } from '@/shared/errors/validation.error';

export const NewWorkflowForm: FC = () => {
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const { mutate, isPending, error, reset } = useCreateWorkflow();
  const errors = error instanceof ValidationError ? error.fieldErrors : clientErrors;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset();
    const result = createWorkflowSchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!result.success) {
      setClientErrors(z.flattenError(result.error).fieldErrors);
      return;
    }
    setClientErrors({});
    mutate(result.data);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor='name' className='font-mono text-[10px] tracking-widest uppercase'>
            Name
          </FieldLabel>
          <Input id='name' name='name' autoFocus placeholder='Release notes on merge' aria-invalid={!!errors.name} />
          <FieldError>{errors.name?.[0]}</FieldError>
        </Field>
        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor='description' className='font-mono text-[10px] tracking-widest uppercase'>
            Description <span className='text-muted-foreground normal-case'>(optional)</span>
          </FieldLabel>
          <Textarea
            id='description'
            name='description'
            rows={4}
            placeholder='What this workflow does and when it runs.'
            aria-invalid={!!errors.description}
          />
          <FieldError>{errors.description?.[0]}</FieldError>
        </Field>
      </FieldGroup>
      <div className='mt-8 flex justify-end gap-2'>
        <DialogClose asChild>
          <Button variant='ghost'>Cancel</Button>
        </DialogClose>
        <LoadingButton
          type='submit'
          loading={isPending}
          loadingLabel='Creating workflow'
          className='ring-primary-soft/30 shadow-primary/50 bg-linear-to-b from-white/15 to-transparent px-4 shadow-[0_0_24px] ring-1'>
          Create workflow
        </LoadingButton>
      </div>
    </form>
  );
};
