import { FC } from 'react';
import { LayoutProps, VerticalLayout } from '@jsonforms/core';
import { JsonFormsDispatch } from '@jsonforms/react';

export const VerticalLayoutRenderer: FC<LayoutProps> = ({ uischema, schema, path, renderers, cells }) => (
  <div className='flex flex-col gap-5'>
    {(uischema as VerticalLayout).elements.map((element, index) => (
      <JsonFormsDispatch key={index} uischema={element} schema={schema} path={path} renderers={renderers} cells={cells} />
    ))}
  </div>
);
