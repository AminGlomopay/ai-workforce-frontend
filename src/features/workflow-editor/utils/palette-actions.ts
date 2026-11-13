import { OPERATION_PROPERTY_NAME } from '../constants/workflow-editor.constants';
import { OptionsNodeProperty, PaletteEntry, WorkflowNodeType } from '../types/workflow-editor.types';

// Only operations with an `action` label are actions; If's comparison operations are not.
export const toPaletteActions = (nodeType: WorkflowNodeType): PaletteEntry[] => {
  const operation = nodeType.properties.find(
    (property): property is OptionsNodeProperty => property.name === OPERATION_PROPERTY_NAME && property.type === 'options',
  );

  return (operation?.options ?? []).flatMap((option) =>
    option.action
      ? [
          {
            key: `${nodeType.type}:${option.value}`,
            label: option.action,
            description: option.description ?? nodeType.description,
            parameters: { [OPERATION_PROPERTY_NAME]: option.value },
          },
        ]
      : [],
  );
};
