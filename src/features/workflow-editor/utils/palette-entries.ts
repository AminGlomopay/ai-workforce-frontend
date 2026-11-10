import { OPERATION_PROPERTY_NAME } from '../constants/workflow-editor.constants';
import { OptionsNodeProperty, PaletteEntry, WorkflowNodeType } from '../types/workflow-editor.types';

// Only operations with an `action` label become their own entries; If's comparison operations do not.
export const toPaletteEntries = (nodeType: WorkflowNodeType): PaletteEntry[] => {
  const operation = nodeType.properties.find(
    (property): property is OptionsNodeProperty => property.name === OPERATION_PROPERTY_NAME && property.type === 'options',
  );
  const actions = operation?.options.filter((option) => option.action) ?? [];
  if (!actions.length) return [{ key: nodeType.type, label: nodeType.displayName, description: nodeType.description, parameters: {} }];

  return actions.map((option) => ({
    key: `${nodeType.type}:${option.value}`,
    label: `${nodeType.displayName}: ${option.action}`,
    description: option.description ?? nodeType.description,
    parameters: { [OPERATION_PROPERTY_NAME]: option.value },
  }));
};
