import { FC } from 'react';
import { Clock, MousePointerClick, Zap } from 'lucide-react';

import { EXECUTION_MODE_LABELS } from '../constants/workflow-editor.constants';
import { ExecutionMode } from '../types/workflow-execution.types';

const MODE_ICONS = { MANUAL: MousePointerClick, APPLICATION_EVENT: Zap, SCHEDULE: Clock };

interface ExecutionModeLabelProps {
  mode: ExecutionMode;
}

export const ExecutionModeLabel: FC<ExecutionModeLabelProps> = ({ mode }) => {
  const Icon = MODE_ICONS[mode];

  return (
    <span className='flex items-center gap-1'>
      <Icon className='text-primary-soft/80 size-3' />
      {EXECUTION_MODE_LABELS[mode]}
    </span>
  );
};
