import { Injectable } from '@angular/core';
import { FieldTypeDefiniation } from '../models/fields';
import { TextField } from '../components/field-types/text-field/text-field';
import { CheckboxField } from '../components/field-types/checkbox-field/checkbox-field';
import { SelectField } from '../components/field-types/select-field/select-field';

const TEXT_FIELD_DEFINATION = {
  type: 'text',
  label: 'Text Field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  component: TextField,
};

const SELECT_FIELD_DEFINATION = {
  type: 'select',
  label: 'Select',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Select',
    required: false,
  },
  component: SelectField,
};

const CHECKBOX_FIELD_DEFINATION = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box',
  defaultConfig: {
    label: 'Checkbox',
    required: false,
  },
  component: CheckboxField,
};

const TEXTAREA_FIELD_DEFINATION = {
  type: 'textArea',
  label: 'textArea',
  icon: 'check_box',
  defaultConfig: {
    label: 'Checkbox',
    required: false,
  },
  component: CheckboxField,
};

@Injectable({
  providedIn: 'root',
})
export class FieldTypes {
  fieldTypes = new Map<string, FieldTypeDefiniation>([
    ['text', TEXT_FIELD_DEFINATION],
    ['checkbox', CHECKBOX_FIELD_DEFINATION],
    ['select', SELECT_FIELD_DEFINATION],
  ]);

  constructor() {}

  getFieldType(type: string): FieldTypeDefiniation | undefined {
    return this.fieldTypes.get(type);
  }

  getAllFieldsValue() {
    return Array.from(this.fieldTypes.values());
  }
}
