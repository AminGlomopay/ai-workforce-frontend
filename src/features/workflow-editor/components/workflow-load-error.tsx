import { FC } from 'react';
import { ErrorComponentProps } from '@tanstack/react-router';

import { WorkflowNotFound } from './workflow-not-found';

import { BackendError } from '@/shared/errors/backend.error';

export const WorkflowLoadError: FC<ErrorComponentProps> = ({ error }) => {
  if (!(error instanceof BackendError && error.status === 404)) throw error;
  return <WorkflowNotFound />;
};
