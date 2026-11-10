import { FC } from 'react';

interface EditorStatusProps {
  versionNumber: number;
}

export const EditorStatus: FC<EditorStatusProps> = ({ versionNumber }) => (
  <span className='text-muted-foreground flex shrink-0 items-center gap-2 font-mono text-[10px] tracking-widest uppercase'>
    <span className='bg-primary-soft size-1.5 rounded-full' />
    Draft · version {versionNumber}
  </span>
);
