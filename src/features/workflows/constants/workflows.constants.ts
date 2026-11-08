import { Circle, Diamond, Plus, Square, Triangle } from 'lucide-react';

export const PIPELINE_STEPS = [
  { title: 'An event arrives', description: 'From any connected source.' },
  { title: 'Your filters decide', description: 'Only what matches gets through.' },
  { title: 'The agent runs your prompt', description: 'With the event as context.' },
  { title: 'Results go where you say', description: 'The prompt picks the destination.' },
];

export const DIAGRAM_CENTER_Y = 135;

export const GATE_X = 402;

export const AGENT_X = 603;

export const EVENT_SOURCES = [
  { y: 28, icon: Circle, fill: 'currentColor' },
  { y: 82, icon: Square, fill: 'none' },
  { y: 135, icon: Triangle, fill: 'none' },
  { y: 188, icon: Diamond, fill: 'none' },
  { y: 242, icon: Plus, fill: 'none' },
];

export const DESTINATION_YS = [40, 101, 167, 231];
