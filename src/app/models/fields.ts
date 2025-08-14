import { Type } from '@angular/core';

export interface FieldTypeDefiniation {
  type: string;
  label: string;
  icon: string;
  defaultConfig: any;
  settingsConfig: fieldSettingDefinition[];
  component: Type<unknown>;
//  columns ? : string[]
}

export interface fieldSettingDefinition {
  type:
    | 'text'
    | 'checkbox'
    | 'select'
    | 'radio'
    | 'dynamic-options'
    | 'textarea'
    | 'button' 
    | 'table';
  key: string;
  label: string;
  options?: OptionItem[] 
}
export interface FormFields {
  id: string;
  type: string;
  label: string;
  required: boolean;
  inputType?: string;
  placeholder?: string;
  options: OptionItem[];
  columns?: string[]
  controlName: string;
}

export interface OptionItem {
  label: string;
  value: string;
}

// export default interface StandardField extends FormFieldsBase {
//   type: string; // allow any string, runtime checks will distinguish 'table'
//   options: OptionItem[];
// }

// export interface TableField extends FormFieldsBase {
//   type: 'table';
//   options: { [key: string]: string }[];
//   columns: string[];
// }

// export interface TableColumn {
//   id: string;
//   header: string;
//   field: string; // property in row data
// }

// export interface TableData {
//   id: string;
//   columns: TableColumn[];
//   rows: any[]; // array of objects where keys = column.field
// }



// export type FormFields = StandardField | TableField;
