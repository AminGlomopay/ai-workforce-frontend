import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

interface EditorTitleProps {
  name: string;
}

export const EditorTitle: FC<EditorTitleProps> = ({ name }) => (
  <div className='flex items-center gap-3'>
    <Button asChild variant='ghost' size='icon-sm' aria-label='Back to workflows'>
      <Link to='/workflows'>
        <ArrowLeft />
      </Link>
    </Button>
    <div className='flex flex-col'>
      <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>Workflow</span>
      <h1 className='text-sm font-semibold tracking-tight'>{name}</h1>
    </div>
  </div>
);
