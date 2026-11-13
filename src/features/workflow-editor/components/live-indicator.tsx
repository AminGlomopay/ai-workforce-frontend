import { FC } from 'react';

import { EXECUTIONS_POLL_INTERVAL } from '../constants/workflow-editor.constants';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip';

export const LiveIndicator: FC = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span tabIndex={0} className='text-primary-soft flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase'>
        <span className='relative flex size-1.5'>
          <span className='bg-primary-soft absolute inset-0 animate-ping rounded-full opacity-60' />
          <span className='bg-primary-soft relative size-1.5 rounded-full shadow-[0_0_8px_var(--primary-soft)]' />
        </span>
        Live
      </span>
    </TooltipTrigger>
    <TooltipContent side='bottom' sideOffset={6}>
      Checks for new runs every {EXECUTIONS_POLL_INTERVAL / 1000}s while this tab is open
    </TooltipContent>
  </Tooltip>
);
