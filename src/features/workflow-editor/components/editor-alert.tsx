import { FC, ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';

interface EditorAlertProps {
  title: string;
  children: ReactNode;
}

export const EditorAlert: FC<EditorAlertProps> = ({ title, children }) => (
  <div
    role='alert'
    className='bg-popover border-destructive/40 animate-in fade-in slide-in-from-top-1 absolute top-full right-6 z-20 mt-2 flex w-96 flex-col gap-3 rounded-lg border p-4 shadow-xl'>
    <span className='text-destructive flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase'>
      <TriangleAlert className='size-3.5' />
      {title}
    </span>
    {children}
  </div>
);
