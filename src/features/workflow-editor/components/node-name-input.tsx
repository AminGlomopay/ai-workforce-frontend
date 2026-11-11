import { FC, KeyboardEvent, useState } from 'react';
import { useReactFlow } from '@xyflow/react';

import { NODE_NAME_MAX_LENGTH } from '../constants/workflow-editor.constants';
import { CanvasNode } from '../types/workflow-editor.types';
import { findNodeNameIssue } from '../utils/find-node-name-issue';
import { isSaveShortcut } from '../utils/is-save-shortcut';

import { Input } from '@/shared/components/ui/input';

interface NodeNameInputProps {
  node: CanvasNode;
}

// Reads as the panel title until hovered or focused. Enter, blur and ⌘S commit; Escape restores the name.
// ⌘S blurs first so the save shortcut, which handles the same keydown next, saves the new name.
// Keyed by the name so a reload that renames the node resets the field.
export const NodeNameInput: FC<NodeNameInputProps> = ({ node }) => {
  const { getNodes, updateNodeData } = useReactFlow<CanvasNode>();
  const [issue, setIssue] = useState<string>();

  const rename = (input: HTMLInputElement) => {
    const name = input.value.trim();
    const otherNames = getNodes()
      .filter(({ id }) => id !== node.id)
      .map(({ data }) => data.name);
    const nameIssue = findNodeNameIssue(name, otherNames);
    setIssue(nameIssue);
    input.value = nameIssue ? node.data.name : name;
    if (!nameIssue) updateNodeData(node.id, { name });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') event.currentTarget.value = node.data.name;
    if (event.key === 'Enter' || event.key === 'Escape' || isSaveShortcut(event)) event.currentTarget.blur();
  };

  return (
    <>
      <Input
        key={node.data.name}
        defaultValue={node.data.name}
        aria-label='Node name'
        maxLength={NODE_NAME_MAX_LENGTH}
        spellCheck={false}
        onChange={() => setIssue(undefined)}
        onKeyDown={onKeyDown}
        onBlur={(event) => rename(event.currentTarget)}
        className='hover:border-input focus-visible:border-ring dark:hover:bg-input/30 dark:focus-visible:bg-input/30 -mx-2 h-7 w-[calc(100%+1rem)] truncate border-transparent bg-transparent px-2 text-sm font-semibold tracking-tight focus-visible:ring-2 md:text-sm dark:bg-transparent'
      />
      {issue && <p className='text-destructive animate-in fade-in text-xs leading-snug'>{issue}</p>}
    </>
  );
};
