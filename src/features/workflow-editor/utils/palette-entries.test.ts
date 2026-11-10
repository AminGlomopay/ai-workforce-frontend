import { describe, expect, it } from 'vitest';

import { toPaletteEntries } from './palette-entries';
import { NodeProperty, WorkflowNodeType } from '../types/workflow-editor.types';

const nodeType = (properties: NodeProperty[]): WorkflowNodeType => ({
  type: 'example',
  version: 1,
  displayName: 'Example',
  description: 'Example node',
  group: 'action',
  icon: 'box',
  defaults: { name: 'Example' },
  inputs: [],
  outputs: [],
  properties,
});

describe('toPaletteEntries', () => {
  it('lists one entry per operation with an action', () => {
    const entries = toPaletteEntries(
      nodeType([
        {
          name: 'operation',
          displayName: 'Operation',
          type: 'options',
          default: 'send',
          options: [{ name: 'Send', value: 'send', action: 'Send a message' }],
        },
      ]),
    );

    expect(entries).toEqual([
      { key: 'example:send', label: 'Example: Send a message', description: 'Example node', parameters: { operation: 'send' } },
    ]);
  });

  it('keeps a single entry when operations have no action labels', () => {
    const entries = toPaletteEntries(
      nodeType([
        {
          name: 'operation',
          displayName: 'Operation',
          type: 'options',
          default: 'equals',
          options: [
            { name: 'Is Equal To', value: 'equals' },
            { name: 'Contains', value: 'contains' },
          ],
        },
      ]),
    );

    expect(entries).toEqual([{ key: 'example', label: 'Example', description: 'Example node', parameters: {} }]);
  });
});
