import { FC } from 'react';

import { PIPELINE_STEPS } from '../constants/workflows.constants';

import { PipelineStep } from './pipeline-step';

export const PipelineSteps: FC = () => (
  <ol className='mx-16 grid grid-cols-4 gap-3'>
    {PIPELINE_STEPS.map((step, index) => (
      <PipelineStep key={step.title} index={index} title={step.title} description={step.description} />
    ))}
  </ol>
);
