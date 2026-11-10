import { FC } from 'react';
import { TriangleAlert } from 'lucide-react';

interface NodeIssuesBadgeProps {
  missingLabels: string[];
}

export const NodeIssuesBadge: FC<NodeIssuesBadgeProps> = ({ missingLabels }) => (
  <span
    title={`Required: ${missingLabels.join(', ')}`}
    className='bg-background border-destructive/50 text-destructive absolute -top-2 -right-2 flex items-center gap-1 rounded-full border px-1.5 py-0.5 font-mono text-[10px]'>
    <TriangleAlert className='size-3' />
    {missingLabels.length}
  </span>
);
