import { Circle, Diamond, Plus, Square, Triangle } from 'lucide-react';

import { BACKEND_URL } from '@/shared/constants/backend.constants';

export const PIPELINE_STEPS = [
  { title: 'Pick a trigger', description: 'An app event or a manual run starts it.' },
  { title: 'Add nodes', description: 'Actions, branches and loops, dropped on the canvas.' },
  { title: 'Connect them', description: 'Each node reads the output of the nodes before it.' },
  { title: 'Run, then publish', description: 'Test it from the editor, then let events run it.' },
];

export const DIAGRAM_CENTER_Y = 135;

export const TRIGGER_X = 402;

export const TRIGGER_RADIUS = 18;

export const AGENT_X = 603;

export const EVENT_SOURCES = [
  { y: 28, icon: Circle, fill: 'currentColor' },
  { y: 82, icon: Square, fill: 'none' },
  { y: 135, icon: Triangle, fill: 'none' },
  { y: 188, icon: Diamond, fill: 'none' },
  { y: 242, icon: Plus, fill: 'none' },
];

export const DESTINATION_YS = [40, 101, 167, 231];

export const WORKFLOW_NAME_MAX_LENGTH = 200;

export const WORKFLOW_DESCRIPTION_MAX_LENGTH = 2000;

export const WORKFLOWS_ENDPOINT = `${BACKEND_URL}/workflows`;

export const WORKFLOWS_QUERY_KEYS = {
  LIST: ['workflows', 'list'],
} as const;
