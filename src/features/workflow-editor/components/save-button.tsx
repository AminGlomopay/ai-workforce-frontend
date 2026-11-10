import { FC } from 'react';
import { Save } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

const SHORTCUT_LABEL = navigator.platform.startsWith('Mac') ? '⌘S' : 'Ctrl S';

interface SaveButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export const SaveButton: FC<SaveButtonProps> = ({ disabled, onClick }) => (
  <Button disabled={disabled} onClick={onClick} className='ring-primary-soft/30 shadow-primary/50 shadow-[0_0_24px] ring-1 disabled:shadow-none'>
    <Save />
    Save
    <kbd className='text-primary-foreground/70 font-mono text-[10px]'>{SHORTCUT_LABEL}</kbd>
  </Button>
);
