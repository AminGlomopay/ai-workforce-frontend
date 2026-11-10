import { FC, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import { useReactFlow } from '@xyflow/react';

import { PARAMETER_RENDERERS } from '../constants/parameter-renderers.constants';
import { NodePropertiesContext } from '../contexts/node-properties.context';
import { CanvasNode, WorkflowNodeType } from '../types/workflow-editor.types';
import { toJsonForms } from '../utils/to-json-forms';

interface NodeParametersFormProps {
  node: CanvasNode;
  nodeType: WorkflowNodeType;
}

// JSON Forms compares data by reference, so the parameters it emits are stored and passed back untouched.
// Required hints and the canvas badge come from isPropertyVisible, so JSON Forms validation is off.
export const NodeParametersForm: FC<NodeParametersFormProps> = ({ node, nodeType }) => {
  const { updateNodeData } = useReactFlow<CanvasNode>();
  const { schema, uischema } = useMemo(() => toJsonForms(nodeType), [nodeType]);

  return (
    <NodePropertiesContext value={nodeType.properties}>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={node.data.parameters}
        renderers={PARAMETER_RENDERERS}
        validationMode='NoValidation'
        onChange={({ data }) => updateNodeData(node.id, { parameters: data })}
      />
    </NodePropertiesContext>
  );
};
