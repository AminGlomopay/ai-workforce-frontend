import { FC } from 'react';

import { EditorTopBar } from '../components/editor-top-bar';
import { WorkflowCanvas } from '../components/workflow-canvas';

export const WorkflowEditorPage: FC = () => (
  <div className='flex h-dvh flex-col'>
    <EditorTopBar />
    <WorkflowCanvas />
  </div>
);
