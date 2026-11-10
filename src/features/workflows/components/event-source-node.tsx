import { FC } from 'react';
import { LucideIcon } from 'lucide-react';

import { DIAGRAM_CENTER_Y, TRIGGER_RADIUS, TRIGGER_X } from '../constants/workflows.constants';

const NODE_X = 118;

interface EventSourceNodeProps {
  y: number;
  icon: LucideIcon;
  fill: string;
}

export const EventSourceNode: FC<EventSourceNodeProps> = ({ y, icon: Icon, fill }) => {
  const path = `M${NODE_X + 14} ${y} C 260 ${y}, 300 ${DIAGRAM_CENTER_Y}, ${TRIGGER_X - TRIGGER_RADIUS} ${DIAGRAM_CENTER_Y}`;

  return (
    <g>
      <path d={path} fill='none' className='stroke-foreground/15' />
      <circle r='2' className='fill-foreground'>
        <animateMotion dur={`${3 + y / 60}s`} repeatCount='indefinite' path={path} />
      </circle>
      <circle cx={NODE_X} cy={y} r='13' className='fill-background stroke-foreground/20' />
      <Icon x={NODE_X - 5} y={y - 5} width={10} height={10} fill={fill} className='text-foreground/80' />
    </g>
  );
};
