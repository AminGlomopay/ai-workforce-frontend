import { FC } from 'react';

import { DIAGRAM_CENTER_Y, GATE_X } from '../constants/workflows.constants';

export const FilterGate: FC = () => (
  <g>
    <rect x={GATE_X - 6} y={DIAGRAM_CENTER_Y - 50} width='12' height='36' rx='2' className='fill-background stroke-foreground/30' />
    <rect x={GATE_X - 6} y={DIAGRAM_CENTER_Y + 14} width='12' height='36' rx='2' className='fill-background stroke-foreground/30' />
    <line x1={GATE_X - 12} x2={GATE_X + 12} y1={DIAGRAM_CENTER_Y - 10} y2={DIAGRAM_CENTER_Y - 10} className='stroke-primary-soft' />
    <line x1={GATE_X - 12} x2={GATE_X + 12} y1={DIAGRAM_CENTER_Y + 10} y2={DIAGRAM_CENTER_Y + 10} className='stroke-primary-soft' />
  </g>
);
