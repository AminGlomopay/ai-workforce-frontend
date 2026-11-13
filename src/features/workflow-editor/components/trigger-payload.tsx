import { FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { EmptyOutput } from './empty-output';
import { JsonBlock } from './json-block';
import { nodeRunsQueryOptions } from '../apis/workflow-editor.queries';
import { NodeRun } from '../types/workflow-execution.types';

interface TriggerPayloadProps {
  executionId: string;
  triggerNodeId: string;
  runs: NodeRun[];
}

// What started the run (a webhook payload, the schedule's time) is the trigger node's output.
export const TriggerPayload: FC<TriggerPayloadProps> = ({ executionId, triggerNodeId, runs }) => {
  const [triggerRun] = useSuspenseQuery(nodeRunsQueryOptions(executionId, triggerNodeId, runs)).data;

  return triggerRun?.output ? (
    <JsonBlock label='Trigger payload' value={triggerRun.output} />
  ) : (
    <EmptyOutput label='Trigger payload' message='Empty payload' />
  );
};
