import { FC } from 'react';
import { useBlocker } from '@tanstack/react-router';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';

interface UnsavedChangesDialogProps {
  hasUnsavedChanges: boolean;
}

// The canvas lives only in the editor, so leaving it with unsaved edits would drop them.
export const UnsavedChangesDialog: FC<UnsavedChangesDialogProps> = ({ hasUnsavedChanges }) => {
  const { status, proceed, reset } = useBlocker({
    shouldBlockFn: () => hasUnsavedChanges,
    enableBeforeUnload: hasUnsavedChanges,
    withResolver: true,
  });

  return (
    <Dialog open={status === 'blocked'} onOpenChange={(open) => !open && reset?.()}>
      <DialogContent>
        <DialogHeader>
          <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>Unsaved changes</span>
          <DialogTitle>Leave without saving?</DialogTitle>
          <DialogDescription>Your edits since the last save are only on this canvas. Leaving the editor discards them.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='ghost' onClick={reset}>
            Stay in editor
          </Button>
          <Button variant='destructive' onClick={proceed}>
            Discard and leave
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
