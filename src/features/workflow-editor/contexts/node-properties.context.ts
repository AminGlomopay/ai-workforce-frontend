import { createContext } from 'react';

import { NodeProperty } from '../types/workflow-editor.types';

export const NodePropertiesContext = createContext<NodeProperty[]>([]);
