import { Type } from '@angular/core';

export interface FieldTypeDefiniation {
  type: string;
  label: string;
  icon: string;
  defaultConfig: any;
  settingsConfig : fieldSettingDefinition[];
  component: Type<unknown>;
}

export interface fieldSettingDefinition {
 type : 'text' | 'checkbox' | 'select' | 'radio' | 'dynamic-options' | 'textarea';
 key : string;
 label : string;
 options?: OptionItem[];
}

export interface OptionItem {
  label : string
  value : string
}
export interface FormFields {
  id: string;
  type: string;
  label: string;
  required: boolean;
  inputType?: string;
  placeholder?: string;
  options: OptionItem[];
} 
