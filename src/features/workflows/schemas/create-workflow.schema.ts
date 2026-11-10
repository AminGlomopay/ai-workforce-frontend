import { z } from 'zod';

import { WORKFLOW_DESCRIPTION_MAX_LENGTH, WORKFLOW_NAME_MAX_LENGTH } from '../constants/workflows.constants';

export const createWorkflowSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Give the workflow a name.')
    .max(WORKFLOW_NAME_MAX_LENGTH, `Keep the name to ${WORKFLOW_NAME_MAX_LENGTH} characters or fewer.`),
  description: z
    .string()
    .trim()
    .max(WORKFLOW_DESCRIPTION_MAX_LENGTH, `Keep the description to ${WORKFLOW_DESCRIPTION_MAX_LENGTH} characters or fewer.`)
    .transform((description) => description || undefined),
});
