import { FC, useState } from 'react';
import { PowerOff } from 'lucide-react';

import { useDeactivateWorkflow } from '../hooks/use-deactivate-workflow';

import { PulseSpinner } from '@/shared/components/public';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

interface DeactivateWorkflowDialogProps {
  workflowId: string;
  workflowName: string;
}

export const DeactivateWorkflowDialog: FC<DeactivateWorkflowDialogProps> = ({ workflowId, workflowName }) => {
  const [open, setOpen] = useState(false);
  const { mutate: deactivate, isPending } = useDeactivateWorkflow(workflowId);

  return (
    <Dialog open={open} onOpenChange={(next) => !isPending && setOpen(next)}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='text-muted-foreground hover:text-destructive'>
          <PowerOff />
          Deactivate
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <span className='text-destructive font-mono text-[10px] tracking-widest uppercase'>Deactivate workflow</span>
          <DialogTitle>Stop {workflowName}?</DialogTitle>
          <DialogDescription>
            It stops running on new Zoho Desk events. Its saved versions stay, and you can publish again at any time.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='ghost' disabled={isPending}>
              Keep running
            </Button>
          </DialogClose>
          <Button
            variant='destructive'
            disabled={isPending}
            aria-busy={isPending}
            onClick={() => deactivate(undefined, { onSuccess: () => setOpen(false) })}>
            {isPending ? (
              <>
                <PulseSpinner />
                Deactivating…
              </>
            ) : (
              <>
                <PowerOff />
                Deactivate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
