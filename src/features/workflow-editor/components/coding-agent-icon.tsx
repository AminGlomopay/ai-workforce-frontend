import { FC } from 'react';

import codingAgentPortrait from '../assets/coding-agent.webp';

import { cn } from '@/shared/utils/cn';

interface CodingAgentIconProps {
  className: string;
}

// The portrait has white corners, so it is clipped to a circle.
export const CodingAgentIcon: FC<CodingAgentIconProps> = ({ className }) => (
  <img src={codingAgentPortrait} alt='' className={cn('ring-primary-soft/40 rounded-full ring-1', className)} />
);
