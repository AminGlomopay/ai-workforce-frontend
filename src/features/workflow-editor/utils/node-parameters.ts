import { isPropertyVisible } from './is-property-visible';
import { NodeParameters, NodeProperty } from '../types/workflow-editor.types';

export const withDefaultParameters = (properties: NodeProperty[], parameters: NodeParameters): NodeParameters => ({
  ...Object.fromEntries(properties.map((property) => [property.name, property.default])),
  ...parameters,
});

const findRequiredProperties = (properties: NodeProperty[], parameters: NodeParameters): NodeProperty[] =>
  properties.filter((property) => property.required && isPropertyVisible(property, parameters));

export const findMissingProperties = (properties: NodeProperty[], parameters: NodeParameters): NodeProperty[] =>
  findRequiredProperties(properties, parameters).filter((property) => !parameters[property.name]);

// The backend rejects unknown keys, and hidden values must not survive a save.
export const toSavedParameters = (properties: NodeProperty[], parameters: NodeParameters): NodeParameters =>
  Object.fromEntries(
    properties
      .filter((property) => property.name in parameters && isPropertyVisible(property, parameters))
      .map((property) => [property.name, parameters[property.name]]),
  );
