import { FC } from 'react';
import { Play } from 'lucide-react';

import { PulseSpinner } from './pulse-spinner';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

interface RunButtonProps {
  disabled: boolean;
  isRunning: boolean;
  onClick: () => void;
}

export const RunButton: FC<RunButtonProps> = ({ disabled, isRunning, onClick }) => (
  <Button
    variant='outline'
    disabled={disabled}
    aria-busy={isRunning}
    onClick={onClick}
    className={cn('border-primary-soft/40 min-w-24', isRunning && 'border-beam before:[animation-duration:1.2s] disabled:opacity-100')}>
    {isRunning ? (
      <>
        <PulseSpinner />
        Running…
      </>
    ) : (
      <>
        <Play className='text-primary-soft fill-primary-soft/30' />
        Run
      </>
    )}
  </Button>
);
