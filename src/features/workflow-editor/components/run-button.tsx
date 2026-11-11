import { FC } from 'react';
import { Play } from 'lucide-react';

import { PulseSpinner } from '@/shared/components/public';
import { Button } from '@/shared/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/utils/cn';

interface RunButtonProps {
  disabled: boolean;
  disabledReason?: string;
  isRunning: boolean;
  onClick: () => void;
}

export const RunButton: FC<RunButtonProps> = ({ disabled, disabledReason, isRunning, onClick }) => {
  const button = (
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
  if (!disabledReason) return button;

  // A disabled button gets no pointer events, so the tooltip hangs off a focusable wrapper.
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0} aria-label={disabledReason}>
          {button}
        </span>
      </TooltipTrigger>
      <TooltipContent side='bottom' sideOffset={6} className='max-w-64 leading-snug'>
        {disabledReason}
      </TooltipContent>
    </Tooltip>
  );
};
