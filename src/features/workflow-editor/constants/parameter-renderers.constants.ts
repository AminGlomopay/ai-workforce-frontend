import { and, isOneOfEnumControl, isStringControl, JsonFormsRendererRegistryEntry, optionIs, rankWith, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsControlProps, withJsonFormsLayoutProps } from '@jsonforms/react';

import { SelectControl } from '../components/select-control';
import { TextControl } from '../components/text-control';
import { TextareaControl } from '../components/textarea-control';
import { VerticalLayoutRenderer } from '../components/vertical-layout-renderer';

// Ranks sit above the vanilla renderers (1) so these win if both sets are ever registered.
export const PARAMETER_RENDERERS: JsonFormsRendererRegistryEntry[] = [
  { tester: rankWith(2, uiTypeIs('VerticalLayout')), renderer: withJsonFormsLayoutProps(VerticalLayoutRenderer) },
  { tester: rankWith(2, isStringControl), renderer: withJsonFormsControlProps(TextControl) },
  { tester: rankWith(3, and(isStringControl, optionIs('multi', true))), renderer: withJsonFormsControlProps(TextareaControl) },
  { tester: rankWith(3, isOneOfEnumControl), renderer: withJsonFormsControlProps(SelectControl) },
];
