import { FC } from 'react';
import { ControlProps } from '@jsonforms/core';

import { ParameterField } from './parameter-field';

import { Textarea } from '@/shared/components/ui/textarea';

export const TextareaControl: FC<ControlProps> = ({ id, path, label, description, data, visible, uischema, handleChange }) => (
  <ParameterField id={id} path={path} label={label} description={description} value={data} visible={visible}>
    <Textarea
      id={id}
      value={data}
      rows={uischema.options?.rows}
      placeholder={uischema.options?.placeholder}
      className='field-sizing-fixed resize-y'
      onChange={(event) => handleChange(path, event.target.value)}
    />
  </ParameterField>
);
