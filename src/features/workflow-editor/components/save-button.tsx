import { FC } from 'react';
import { Save } from 'lucide-react';

import { PulseSpinner } from '@/shared/components/public';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

const SHORTCUT_LABEL = navigator.platform.startsWith('Mac') ? '⌘S' : 'Ctrl S';

interface SaveButtonProps {
  disabled: boolean;
  isSaving: boolean;
  onClick: () => void;
}

export const SaveButton: FC<SaveButtonProps> = ({ disabled, isSaving, onClick }) => (
  <Button
    disabled={disabled}
    aria-busy={isSaving}
    onClick={onClick}
    className={cn(
      'ring-primary-soft/30 shadow-primary/50 min-w-24 shadow-[0_0_24px] ring-1 disabled:shadow-none',
      isSaving && 'border-beam ring-primary-soft/60 shadow-primary before:[animation-duration:1.2s] disabled:opacity-100 disabled:shadow-[0_0_40px]',
    )}>
    {isSaving ? (
      <>
        <span className='border-primary-soft/60 animate-halo pointer-events-none absolute -inset-px rounded-[inherit] border' />
        <span className='pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]'>
          <span className='animate-shimmer absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/40 to-transparent' />
        </span>
        <PulseSpinner />
        <span className='drop-shadow-[0_0_6px_white]'>Saving…</span>
      </>
    ) : (
      <>
        <Save />
        Save
        <kbd className='text-primary-foreground/70 font-mono text-[10px]'>{SHORTCUT_LABEL}</kbd>
      </>
    )}
  </Button>
);
