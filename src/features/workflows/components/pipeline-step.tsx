import { FC } from 'react';

interface PipelineStepProps {
  index: number;
  title: string;
  description: string;
}

export const PipelineStep: FC<PipelineStepProps> = ({ index, title, description }) => (
  <li className='border-primary-soft/20 flex flex-col gap-2 border-t pt-4'>
    <span className='text-primary-soft font-mono text-[10px]'>{String(index + 1).padStart(2, '0')}</span>
    <span className='text-xs font-medium'>{title}</span>
    <span className='text-muted-foreground text-[11px]'>{description}</span>
  </li>
);
