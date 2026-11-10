import { OPERATION_PROPERTY_NAME } from '../constants/workflow-editor.constants';
import { OptionsNodeProperty, PaletteEntry, WorkflowNodeType } from '../types/workflow-editor.types';

export const toPaletteEntries = (nodeType: WorkflowNodeType): PaletteEntry[] => {
  const operation = nodeType.properties.find(
    (property): property is OptionsNodeProperty => property.name === OPERATION_PROPERTY_NAME && property.type === 'options',
  );
  if (!operation) return [{ key: nodeType.type, label: nodeType.displayName, description: nodeType.description, parameters: {} }];

  return operation.options.map((option) => ({
    key: `${nodeType.type}:${option.value}`,
    label: `${nodeType.displayName}: ${option.action ?? option.name}`,
    description: option.description ?? nodeType.description,
    parameters: { [OPERATION_PROPERTY_NAME]: option.value },
  }));
};
