import { FC } from 'react';
import { Plus } from 'lucide-react';

import { AGENT_X, DIAGRAM_CENTER_Y } from '../constants/workflows.constants';

const NODE_X = 814;

interface DestinationNodeProps {
  y: number;
}

export const DestinationNode: FC<DestinationNodeProps> = ({ y }) => {
  const path = `M${AGENT_X + 30} ${DIAGRAM_CENTER_Y} L${NODE_X - 9} ${y}`;

  return (
    <g>
      <path d={path} strokeDasharray='1 4' className='stroke-primary-soft/40' />
      <circle r='2' className='fill-primary-soft'>
        <animateMotion dur={`${2.5 + y / 80}s`} repeatCount='indefinite' path={path} />
      </circle>
      <rect x={NODE_X - 9} y={y - 9} width='18' height='18' rx='3' strokeDasharray='2 2' className='fill-background/70 stroke-primary-soft/40' />
      <Plus x={NODE_X - 5} y={y - 5} width={10} height={10} className='text-foreground/80' />
    </g>
  );
};
