import { Type } from '@angular/core';

export interface FieldTypeDefiniation {
  type: string;
  label: string;
  icon: string;
  defaultConfig: any;
  component: Type<unknown>;
}

export interface FormFields {
  id: string;
  type: string;
  label: string;
  required: boolean;
  inputType?: string;
}
