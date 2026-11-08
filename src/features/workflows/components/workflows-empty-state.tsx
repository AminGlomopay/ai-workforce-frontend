import { FC } from 'react';

import { AgentStatusBar } from './agent-status-bar';
import { PipelineDiagram } from './pipeline-diagram';
import { PipelineSteps } from './pipeline-steps';
import { NoWorkflowsMessage } from './no-workflows-message';

import { CornerMarks } from '@/shared/components/public';

export const WorkflowsEmptyState: FC = () => (
  <section className='bg-grid-glow border-primary/25 relative rounded-xl border px-7 pt-7 pb-12'>
    <CornerMarks />
    <AgentStatusBar />
    <PipelineDiagram />
    <PipelineSteps />
    <NoWorkflowsMessage />
  </section>
);
