import { FC } from 'react';

const CORNER_CLASSES = [
  'top-2.5 left-2.5 border-t border-l',
  'top-2.5 right-2.5 border-t border-r',
  'bottom-2.5 left-2.5 border-b border-l',
  'bottom-2.5 right-2.5 border-b border-r',
];

export const CornerMarks: FC = () =>
  CORNER_CLASSES.map((cornerClass) => <span key={cornerClass} className={`border-primary-soft/50 absolute size-3.5 ${cornerClass}`} />);
