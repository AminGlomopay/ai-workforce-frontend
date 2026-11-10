import { FC } from 'react';
import { useReactFlow } from '@xyflow/react';

import { EditorAlert } from './editor-alert';
import { WorkflowHasIssuesError } from '../errors/workflow-has-issues.error';
import { useFocusNode } from '../hooks/use-focus-node';
import { CanvasNode } from '../types/workflow-editor.types';
import { isIssueForNode } from '../utils/run-issues';

import { Button } from '@/shared/components/ui/button';

interface RunErrorPanelProps {
  error: Error;
  onDismiss: () => void;
}

export const RunErrorPanel: FC<RunErrorPanelProps> = ({ error, onDismiss }) => {
  const { getNodes } = useReactFlow<CanvasNode>();
  const focusNode = useFocusNode();
  const messages = error instanceof WorkflowHasIssuesError ? error.messages : [error.message];

  return (
    <EditorAlert title={error instanceof WorkflowHasIssuesError ? 'Run blocked' : 'Run not started'}>
      <ul className='flex flex-col gap-1.5 text-xs leading-snug'>
        {messages.map((message) => {
          const node = getNodes().find(({ data }) => isIssueForNode(message, data.name));
          return (
            <li key={message} className='first-letter:uppercase'>
              {node ? (
                <Button
                  variant='link'
                  className='text-foreground hover:text-primary-soft h-auto p-0 text-left text-xs font-normal whitespace-normal'
                  onClick={() => focusNode(node.id)}>
                  <span className='first-letter:uppercase'>{message}</span>
                </Button>
              ) : (
                message
              )}
            </li>
          );
        })}
      </ul>
      <Button variant='ghost' size='sm' className='self-start' onClick={onDismiss}>
        Dismiss
      </Button>
    </EditorAlert>
  );
};
