import { FC } from 'react';
import { ControlProps } from '@jsonforms/core';

import { ParameterField } from './parameter-field';

import { Input } from '@/shared/components/ui/input';

export const TextControl: FC<ControlProps> = ({ id, path, label, description, data, visible, uischema, handleChange }) => (
  <ParameterField id={id} path={path} label={label} description={description} value={data} visible={visible}>
    <Input id={id} value={data} placeholder={uischema.options?.placeholder} onChange={(event) => handleChange(path, event.target.value)} />
  </ParameterField>
);
