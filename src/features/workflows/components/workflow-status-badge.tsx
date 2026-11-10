import { FC } from 'react';

import { Badge } from '@/shared/components/ui/badge';

interface WorkflowStatusBadgeProps {
  activeVersionId: string | null;
}

export const WorkflowStatusBadge: FC<WorkflowStatusBadgeProps> = ({ activeVersionId }) =>
  activeVersionId ? (
    <Badge className='bg-primary/20 text-primary-soft border-primary-soft/40 font-mono text-[10px] tracking-widest uppercase'>
      <span className='bg-primary-soft size-1.5 animate-pulse rounded-full' />
      Active
    </Badge>
  ) : (
    <Badge variant='outline' className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>
      Inactive
    </Badge>
  );
