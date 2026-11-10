import { FC } from 'react';

interface NodeRunIssuesProps {
  issues: string[];
}

export const NodeRunIssues: FC<NodeRunIssuesProps> = ({ issues }) => (
  <div className='border-destructive/40 bg-destructive/5 animate-in fade-in flex flex-col gap-1.5 rounded-lg border p-3'>
    <span className='text-destructive font-mono text-[10px] tracking-widest uppercase'>Blocks running</span>
    <ul className='flex flex-col gap-1 text-xs leading-snug'>
      {issues.map((issue) => (
        <li key={issue} className='first-letter:uppercase'>
          {issue}
        </li>
      ))}
    </ul>
  </div>
);
