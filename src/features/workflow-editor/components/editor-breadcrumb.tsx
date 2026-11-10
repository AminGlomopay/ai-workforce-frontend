import { FC } from 'react';
import { Link } from '@tanstack/react-router';

export const EditorBreadcrumb: FC = () => (
  <nav className='flex items-center gap-2.5'>
    <Link to='/workflows' className='text-muted-foreground hover:text-foreground font-mono text-xs'>
      Workflows
    </Link>
    <span className='text-muted-foreground/50 text-xs'>/</span>
    <h1 className='text-sm font-semibold tracking-tight'>Untitled workflow</h1>
    <span className='border-primary-soft/30 text-primary-soft rounded border px-1.5 py-0.5 font-mono text-[10px] tracking-widest uppercase'>
      Draft
    </span>
  </nav>
);
