import { FC, ReactNode, use } from 'react';
import { useJsonForms } from '@jsonforms/react';

import { NodePropertiesContext } from '../contexts/node-properties.context';
import { isPropertyVisible } from '../utils/is-property-visible';

import { Label } from '@/shared/components/ui/label';

interface ParameterFieldProps {
  id: string;
  path: string;
  label: string;
  description?: string;
  value: string;
  visible: boolean;
  children: ReactNode;
}

export const ParameterField: FC<ParameterFieldProps> = ({ id, path, label, description, value, visible, children }) => {
  const property = use(NodePropertiesContext).find(({ name }) => name === path);
  const formData = useJsonForms().core?.data;
  if (!property) throw new Error(`No node property for ${path}`);
  // JSON Forms only marks plain `required` properties, and node state trails the form by a debounce, so use its live data.
  const isRequired = !!property.required && isPropertyVisible(property, formData);
  if (!visible) return null;

  return (
    <div className='animate-in fade-in slide-in-from-bottom-1 fill-mode-both grid gap-2 duration-300'>
      <Label htmlFor={id} className='gap-0.5'>
        {label}
        {isRequired && <span className='text-primary-soft'>*</span>}
      </Label>
      {children}
      {description && <p className='text-muted-foreground text-xs leading-snug'>{description}</p>}
      {isRequired && !value && <p className='text-destructive font-mono text-[10px] tracking-widest uppercase'>Required · draft still saves</p>}
      {property.type === 'string' && property.noDataExpression && value.startsWith('=') && (
        <p className='text-destructive font-mono text-[10px] tracking-widest uppercase'>Must be a fixed value, not a lookup</p>
      )}
    </div>
  );
};
