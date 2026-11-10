import { FC } from 'react';

import { SavedCheck } from './saved-check';
import { SAVED_TOAST_DURATION } from '../constants/workflow-editor.constants';
import { Workflow } from '../types/workflow-editor.types';

import { CornerMarks } from '@/shared/components/public';

interface SavedToastProps {
  workflow: Workflow;
}

export const SavedToast: FC<SavedToastProps> = ({ workflow: { name, version } }) => (
  <div className='bg-popover/85 border-primary-soft/30 shadow-primary/40 relative flex w-(--width) items-center gap-3.5 overflow-hidden rounded-xl border px-5 py-4 shadow-[0_0_48px] backdrop-blur-xl'>
    <CornerMarks />
    <span className='animate-sweep via-primary-soft/20 pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent to-transparent' />
    <SavedCheck />
    <div className='flex min-w-0 flex-col gap-1'>
      <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>Version {version.number} saved</span>
      <span className='truncate text-sm font-semibold tracking-tight'>{name}</span>
      <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>
        {version.nodes.length} {version.nodes.length === 1 ? 'node' : 'nodes'} · {version.connections.length}{' '}
        {version.connections.length === 1 ? 'connection' : 'connections'} · {new Date(version.createdAt).toLocaleTimeString()}
      </span>
    </div>
    <span
      className='from-primary to-primary-soft animate-drain absolute inset-x-0 bottom-0 h-px origin-left bg-linear-to-r group-hover:[animation-play-state:paused]'
      style={{ animationDuration: `${SAVED_TOAST_DURATION}ms` }}
    />
  </div>
);
