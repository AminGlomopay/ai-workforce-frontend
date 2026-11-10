import { FC } from 'react';
import { Panel, useReactFlow, useViewport } from '@xyflow/react';
import { Maximize, Minus, Plus } from 'lucide-react';

import { FIT_VIEW_OPTIONS } from '../constants/workflow-editor.constants';

import { Button } from '@/shared/components/ui/button';

export const CanvasControls: FC = () => {
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const { zoom } = useViewport();

  return (
    <Panel position='bottom-left' className='bg-background/70 m-7 flex items-center gap-1 rounded-lg border p-1 backdrop-blur'>
      <Button variant='ghost' size='icon-sm' aria-label='Fit view' onClick={() => fitView(FIT_VIEW_OPTIONS)}>
        <Maximize />
      </Button>
      <Button variant='ghost' size='icon-sm' aria-label='Zoom out' onClick={() => zoomOut()}>
        <Minus />
      </Button>
      <span className='text-muted-foreground w-12 text-center font-mono text-[10px]'>{Math.round(zoom * 100)}%</span>
      <Button variant='ghost' size='icon-sm' aria-label='Zoom in' onClick={() => zoomIn()}>
        <Plus />
      </Button>
    </Panel>
  );
};
