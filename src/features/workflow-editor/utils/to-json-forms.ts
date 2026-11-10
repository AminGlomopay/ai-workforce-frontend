import { ControlElement, JsonSchema7, Rule, RuleEffect, VerticalLayout } from '@jsonforms/core';

import { NodeProperty, WorkflowNodeType } from '../types/workflow-editor.types';

const toCondition = (show: Record<string, string[]>): JsonSchema7 => ({
  properties: Object.fromEntries(Object.entries(show).map(([name, values]) => [name, { enum: values }])),
  required: Object.keys(show),
});

const toPropertySchema = (property: NodeProperty): JsonSchema7 => {
  const base = { type: 'string', title: property.displayName, description: property.description, default: property.default } as const;
  if (property.type === 'string') return base;
  return { ...base, oneOf: property.options.map((option) => ({ const: option.value, title: option.name, description: option.description })) };
};

const toControlOptions = (property: NodeProperty): ControlElement['options'] => {
  if (property.type !== 'string') return undefined;
  const rows = property.typeOptions?.rows ?? 1;
  return { placeholder: property.placeholder, ...(rows > 1 && { multi: true, rows }) };
};

const toRule = (property: NodeProperty): Rule | undefined =>
  property.displayOptions && { effect: RuleEffect.SHOW, condition: { scope: '#', schema: toCondition(property.displayOptions.show) } };

export const toJsonForms = ({ properties }: WorkflowNodeType): { schema: JsonSchema7; uischema: VerticalLayout } => {
  const conditionallyRequired = properties.flatMap(({ name, required, displayOptions }) =>
    required && displayOptions ? [{ if: toCondition(displayOptions.show), then: { required: [name] } }] : [],
  );

  return {
    schema: {
      type: 'object',
      properties: Object.fromEntries(properties.map((property) => [property.name, toPropertySchema(property)])),
      required: properties.filter((property) => property.required && !property.displayOptions).map((property) => property.name),
      ...(conditionallyRequired.length > 0 && { allOf: conditionallyRequired }),
    },
    uischema: {
      type: 'VerticalLayout',
      elements: properties.map((property): ControlElement => ({
        type: 'Control',
        scope: `#/properties/${property.name}`,
        options: toControlOptions(property),
        rule: toRule(property),
      })),
    },
  };
};
