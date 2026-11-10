import { NodeParameters, NodeProperty } from '../types/workflow-editor.types';

// Expects parameters merged over the property defaults (see withDefaultParameters).
export const isPropertyVisible = ({ displayOptions }: NodeProperty, parameters: NodeParameters): boolean =>
  !displayOptions || Object.entries(displayOptions.show).every(([name, values]) => values.includes(parameters[name]));
