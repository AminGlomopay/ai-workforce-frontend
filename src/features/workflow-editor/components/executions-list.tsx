import { FC } from 'react';

import { ExecutionDayDivider } from './execution-day-divider';
import { ExecutionListItem } from './execution-list-item';
import { HistoryEndSentinel } from './history-end-sentinel';
import { useExecutionFilters } from '../hooks/use-execution-filters';
import { useExecutions } from '../hooks/use-executions';
import { useNow } from '../hooks/use-now';
import { groupExecutionsByDay } from '../utils/group-executions-by-day';

interface ExecutionsListProps {
  workflowId: string;
}

export const ExecutionsList: FC<ExecutionsListProps> = ({ workflowId }) => {
  const { executions, hasNextPage, isFetchingNextPage, fetchNextPage } = useExecutions(workflowId, useExecutionFilters());
  const now = useNow(false);
  if (!executions.length) {
    return <p className='text-muted-foreground px-3 py-6 font-mono text-[10px] tracking-widest uppercase'>No runs to show</p>;
  }

  return (
    <div className='flex flex-col'>
      {groupExecutionsByDay(executions, new Date(now)).map((day) => (
        <section key={day.key}>
          <ExecutionDayDivider label={day.label} />
          <ul className='flex flex-col gap-1'>
            {day.executions.map((execution, index) => (
              <li
                key={execution.id}
                className='animate-in fade-in slide-in-from-left-2 fill-mode-both duration-500'
                style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}>
                <ExecutionListItem execution={execution} />
              </li>
            ))}
          </ul>
        </section>
      ))}
      <HistoryEndSentinel hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} onReached={() => void fetchNextPage()} />
    </div>
  );
};
