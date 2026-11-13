import { WorkflowExecutionSummary } from '../types/workflow-execution.types';

export interface ExecutionDay {
  key: string;
  label: string;
  executions: WorkflowExecutionSummary[];
}

const dayKey = (date: Date) => date.toDateString();

// The list arrives newest first, so each day's runs are already in order.
export const groupExecutionsByDay = (executions: WorkflowExecutionSummary[], now: Date): ExecutionDay[] => {
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const labels = new Map([
    [dayKey(now), 'Today'],
    [dayKey(yesterday), 'Yesterday'],
  ]);
  const days: ExecutionDay[] = [];
  for (const execution of executions) {
    const date = new Date(execution.createdAt);
    const key = dayKey(date);
    let day = days.at(-1);
    if (day?.key !== key) {
      day = { key, label: labels.get(key) ?? date.toLocaleDateString(undefined, { dateStyle: 'medium' }), executions: [] };
      days.push(day);
    }
    day.executions.push(execution);
  }
  return days;
};
