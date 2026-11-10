import { useEffect, useState } from 'react';

import { RUN_BAR_AUTO_HIDE_DELAY } from '../constants/workflow-editor.constants';
import { WorkflowExecutionDetail } from '../types/workflow-execution.types';

// Only successful runs hide on their own; a failed run's error stays until dismissed. Hovering holds it open.
// Hover is tracked per execution because a bar that unmounts under the cursor never gets mouseleave.
export const useRunBarAutoHide = (execution?: WorkflowExecutionDetail) => {
  const [hiddenExecutionId, setHiddenExecutionId] = useState<string | null>(null);
  const [hoveredExecutionId, setHoveredExecutionId] = useState<string | null>(null);
  const executionId = execution?.id ?? null;
  const isCountingDown = execution?.status === 'SUCCEEDED' && hoveredExecutionId !== executionId;

  useEffect(() => {
    if (!isCountingDown) return;
    const timeout = setTimeout(() => setHiddenExecutionId(executionId), RUN_BAR_AUTO_HIDE_DELAY);
    return () => clearTimeout(timeout);
  }, [executionId, isCountingDown]);

  return {
    visibleExecution: executionId === hiddenExecutionId ? undefined : execution,
    isCountingDown,
    onMouseEnter: () => setHoveredExecutionId(executionId),
    onMouseLeave: () => setHoveredExecutionId(null),
  };
};
