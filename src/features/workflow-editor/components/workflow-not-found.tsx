import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { CornerMarks } from '@/shared/components/public';

export const WorkflowNotFound: FC = () => (
  <section className='bg-canvas-glow relative flex h-dvh flex-col items-center justify-center text-center'>
    <CornerMarks />
    <span className='text-primary-soft animate-in fade-in fill-mode-both font-mono text-[10px] tracking-widest uppercase duration-700'>
      404 · Workflow not found
    </span>
    <h1 className='animate-in fade-in slide-in-from-bottom-2 fill-mode-both mt-4 text-3xl font-semibold tracking-tight delay-150 duration-700'>
      This workflow <span className='from-foreground to-primary-soft bg-linear-to-r bg-clip-text text-transparent'>isn&apos;t on your workspace</span>
    </h1>
    <p className='text-muted-foreground animate-in fade-in slide-in-from-bottom-2 fill-mode-both mt-4 max-w-md text-sm leading-relaxed delay-300 duration-700'>
      The link may be wrong, the workflow may have been deleted, or it belongs to someone else.
    </p>
    <Button asChild variant='outline' className='animate-in fade-in slide-in-from-bottom-2 fill-mode-both mt-8 delay-500 duration-700'>
      <Link to='/workflows'>
        <ArrowLeft />
        Back to workflows
      </Link>
    </Button>
  </section>
);
