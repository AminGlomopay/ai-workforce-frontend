import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

export const NewWorkflowButton: FC = () => (
  <Button asChild className='ring-primary-soft/30 shadow-primary/50 bg-linear-to-b from-white/15 to-transparent px-4 shadow-[0_0_24px] ring-1'>
    <Link to='/workflows/new'>
      <Plus />
      New workflow
    </Link>
  </Button>
);
