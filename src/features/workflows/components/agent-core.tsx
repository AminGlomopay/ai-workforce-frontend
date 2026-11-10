import { FC } from 'react';

import { AGENT_X, DIAGRAM_CENTER_Y, TRIGGER_RADIUS, TRIGGER_X } from '../constants/workflows.constants';

const CORE_RADIUS = 22;

export const AgentCore: FC = () => {
  const feedPath = `M${TRIGGER_X + TRIGGER_RADIUS} ${DIAGRAM_CENTER_Y} H${AGENT_X - CORE_RADIUS}`;

  return (
    <g>
      <defs>
        <radialGradient id='agent-orb' cx='35%' cy='30%'>
          <stop offset='0%' stopColor='white' />
          <stop offset='35%' stopColor='var(--primary-soft)' />
          <stop offset='100%' stopColor='var(--primary)' />
        </radialGradient>
      </defs>
      <path d={feedPath} className='stroke-primary-soft/50' />
      <circle r='2.5' className='fill-foreground'>
        <animateMotion dur='2.5s' repeatCount='indefinite' path={feedPath} />
      </circle>
      <circle cx={AGENT_X} cy={DIAGRAM_CENTER_Y} r='70' className='fill-primary/5 stroke-primary/30' />
      <circle cx={AGENT_X} cy={DIAGRAM_CENTER_Y} r='56' fill='none' strokeDasharray='1 4' className='stroke-primary-soft/40' />
      <circle
        cx={AGENT_X}
        cy={DIAGRAM_CENTER_Y}
        r='38'
        fill='none'
        strokeWidth='2'
        strokeDasharray='60 59.4'
        strokeDashoffset='30'
        className='stroke-primary'
      />
      <circle
        cx={AGENT_X}
        cy={DIAGRAM_CENTER_Y}
        r={CORE_RADIUS}
        className='fill-background stroke-primary/40 drop-shadow-[0_0_14px_var(--primary)]'
      />
      <circle cx={AGENT_X} cy={DIAGRAM_CENTER_Y} r='10' fill='url(#agent-orb)' />
    </g>
  );
};
