import { FC } from 'react';

import { ReplayNodeDetails } from './replay-node-details';
import { RunSummary } from './run-summary';
import { useSelectedNode } from '../hooks/use-selected-node';
import { WorkflowVersion } from '../types/workflow-editor.types';
import { WorkflowExecutionDetail } from '../types/workflow-execution.types';

interface ReplaySidePanelProps {
  execution: WorkflowExecutionDetail;
  version: WorkflowVersion;
}

export const ReplaySidePanel: FC<ReplaySidePanelProps> = ({ execution, version }) => {
  const node = useSelectedNode();

  return (
    <aside className='bg-sidebar w-96 shrink-0 overflow-y-auto border-l'>
      <div key={node?.id ?? 'summary'} className='animate-in fade-in slide-in-from-right-4 fill-mode-both flex flex-col gap-6 p-5 duration-300'>
        {node ? <ReplayNodeDetails execution={execution} node={node} /> : <RunSummary execution={execution} version={version} />}
      </div>
    </aside>
  );
};
