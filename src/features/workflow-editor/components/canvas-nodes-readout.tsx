import { FC } from 'react';
import { Panel } from '@xyflow/react';

interface CanvasNodesReadoutProps {
  nodes: unknown;
}

export const CanvasNodesReadout: FC<CanvasNodesReadoutProps> = ({ nodes }) => (
  <Panel
    position='top-left'
    className='bg-background/70 m-7 flex max-w-md items-center gap-3 rounded-lg border px-3 py-2 font-mono text-[10px] backdrop-blur'>
    <span className='text-muted-foreground tracking-widest uppercase'>Nodes</span>
    <code className='text-primary-soft truncate'>{JSON.stringify(nodes)}</code>
  </Panel>
);
