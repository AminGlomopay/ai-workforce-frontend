import { FC } from 'react';

import codingAgentPortrait from '../assets/coding-agent.webp';

import { cn } from '@/shared/utils/cn';

interface CodingAgentIconProps {
  className: string;
}

// The portrait has white corners, so it is clipped to a circle. A face reads smaller than a line icon, so it is scaled up.
export const CodingAgentIcon: FC<CodingAgentIconProps> = ({ className }) => (
  <img src={codingAgentPortrait} alt='' className={cn('ring-primary-soft/40 scale-150 rounded-full ring-1', className)} />
);
