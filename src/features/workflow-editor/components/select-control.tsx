import { FC } from 'react';
import { ControlProps, JsonSchema7 } from '@jsonforms/core';

import { ParameterField } from './parameter-field';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';

export const SelectControl: FC<ControlProps> = ({ id, path, label, description, data, visible, schema, handleChange }) => {
  const options = schema.oneOf as JsonSchema7[];

  return (
    <ParameterField id={id} path={path} label={label} description={description} value={data} visible={visible}>
      <Select value={data} onValueChange={(value) => handleChange(path, value)}>
        <SelectTrigger id={id} className='w-full'>
          <SelectValue>{options.find((option) => option.const === data)?.title}</SelectValue>
        </SelectTrigger>
        {/* nokey: the list is portalled out of the panel, and Backspace there must not delete the node. */}
        <SelectContent className='nokey'>
          {options.map((option) => (
            <SelectItem key={String(option.const)} value={String(option.const)}>
              <span className='flex flex-col'>
                {option.title}
                {option.description && <span className='text-muted-foreground text-xs'>{option.description}</span>}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ParameterField>
  );
};
