import { describe, expect, it } from 'vitest';

import { toPaletteActions } from './palette-actions';
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

describe('toPaletteActions', () => {
  it('lists one action per operation with an action label', () => {
    const actions = toPaletteActions(
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

    expect(actions).toEqual([
      { key: 'example:send', label: 'Send a message', description: 'Example node', nodeName: 'Send a message', parameters: { operation: 'send' } },
    ]);
  });

  it('lists no actions when operations have no action labels', () => {
    const actions = toPaletteActions(
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

    expect(actions).toEqual([]);
  });
});
