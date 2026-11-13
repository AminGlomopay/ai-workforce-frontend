import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { History, Workflow } from 'lucide-react';

const TAB_CLASSES =
  'text-muted-foreground hover:text-foreground data-[status=active]:bg-primary/20 data-[status=active]:text-foreground data-[status=active]:shadow-primary/40 flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-[10px] tracking-widest uppercase transition-all data-[status=active]:shadow-[0_0_14px] [&_svg]:size-3';

interface WorkflowViewTabsProps {
  workflowId: string;
}

export const WorkflowViewTabs: FC<WorkflowViewTabsProps> = ({ workflowId }) => (
  <nav aria-label='Workflow views' className='bg-background/60 mr-auto flex items-center gap-1 rounded-lg border p-0.5'>
    <Link to='/workflows/$workflowId' params={{ workflowId }} activeOptions={{ exact: true }} className={TAB_CLASSES}>
      <Workflow className='text-primary-soft' />
      Editor
    </Link>
    <Link to='/workflows/$workflowId/executions' params={{ workflowId }} className={TAB_CLASSES}>
      <History className='text-primary-soft' />
      Runs
    </Link>
  </nav>
);
