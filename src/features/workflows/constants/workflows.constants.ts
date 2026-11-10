import { Circle, Diamond, Plus, Square, Triangle } from 'lucide-react';

import { BACKEND_URL } from '@/shared/constants/backend.constants';

export const PIPELINE_STEPS = [
  { title: 'Pick a trigger', description: 'Any event can start a workflow.' },
  { title: 'Add nodes', description: 'Apps, logic and AI, dropped on the canvas.' },
  { title: 'Wire them up', description: 'Edges carry data from node to node.' },
  { title: 'Switch it on', description: 'It runs on every matching event.' },
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

export const WORKFLOWS_ENDPOINT = `${BACKEND_URL}/workflows`;

export const WORKFLOWS_QUERY_KEYS = {
  LIST: ['workflows', 'list'],
} as const;
