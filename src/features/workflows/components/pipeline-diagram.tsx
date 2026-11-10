import { FC } from 'react';

import { EVENT_SOURCES, DESTINATION_YS } from '../constants/workflows.constants';

import { EventSourceNode } from './event-source-node';
import { TriggerNode } from './trigger-node';
import { AgentCore } from './agent-core';
import { DestinationNode } from './destination-node';

export const PipelineDiagram: FC = () => (
  <svg viewBox='0 0 940 270' className='my-12 w-full'>
    {EVENT_SOURCES.map((source) => (
      <EventSourceNode key={source.y} y={source.y} icon={source.icon} fill={source.fill} />
    ))}
    <TriggerNode />
    <AgentCore />
    {DESTINATION_YS.map((y) => (
      <DestinationNode key={y} y={y} />
    ))}
  </svg>
);
