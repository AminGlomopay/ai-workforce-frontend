import { FC } from 'react';
import { CircleHelp } from 'lucide-react';

import { NodeSettingsHeader } from './node-settings-header';
import { CanvasNode } from '../types/workflow-editor.types';

interface UnknownNodeSettingsProps {
  node: CanvasNode;
}

export const UnknownNodeSettings: FC<UnknownNodeSettingsProps> = ({ node }) => (
  <>
    <NodeSettingsHeader
      eyebrow='Node settings'
      icon={<CircleHelp className='text-muted-foreground size-5' />}
      title={<span className='truncate text-sm font-semibold tracking-tight'>{node.data.name}</span>}
      typeLabel={`Unknown node · ${node.data.type}@${node.data.typeVersion}`}
      status='Read-only · saved as loaded'
    />
    <p className='text-muted-foreground text-xs leading-snug'>
      The backend no longer describes this node type, so its settings can't be edited. They are kept exactly as saved.
    </p>
    <dl className='flex flex-col gap-3'>
      {Object.entries(node.data.parameters).map(([name, value]) => (
        <div key={name} className='flex flex-col gap-1'>
          <dt className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>{name}</dt>
          <dd className='text-xs break-all'>{value || '—'}</dd>
        </div>
      ))}
    </dl>
  </>
);
