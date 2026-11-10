import { FC } from 'react';

import { DIAGRAM_CENTER_Y, TRIGGER_RADIUS, TRIGGER_X } from '../constants/workflows.constants';

import { FanOutIcon } from '@/shared/components/public';

const SIDE = TRIGGER_RADIUS * Math.SQRT2;

export const TriggerNode: FC = () => (
  <g>
    <rect
      x={TRIGGER_X - SIDE / 2}
      y={DIAGRAM_CENTER_Y - SIDE / 2}
      width={SIDE}
      height={SIDE}
      rx='3'
      transform={`rotate(45 ${TRIGGER_X} ${DIAGRAM_CENTER_Y})`}
      className='fill-background stroke-primary-soft/70 drop-shadow-[0_0_10px_var(--primary)]'
    />
    <FanOutIcon x={TRIGGER_X - 7} y={DIAGRAM_CENTER_Y - 7} width={14} height={14} className='text-foreground' />
  </g>
);
