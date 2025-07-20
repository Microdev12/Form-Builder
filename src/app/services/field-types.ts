import { Injectable } from '@angular/core';
import { fieldSettingDefinition, FieldTypeDefiniation } from '../models/fields';
import { TextField } from '../components/field-types/text-field/text-field';
import { CheckboxField } from '../components/field-types/checkbox-field/checkbox-field';
import { SelectField } from '../components/field-types/select-field/select-field';
import { TextAreaField } from '../components/field-types/text-area-field/text-area-field';
import { RadioGroupField } from '../components/field-types/radio-group-field/radio-group-field';
import { DateField } from '../components/field-types/date-field/date-field';
import { TableField } from '../components/field-types/table-field/table-field';

const TEXT_FIELD_DEFINATION: FieldTypeDefiniation = {
  type: 'text',
  label: 'Text Field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label',
    },
    {
      type: 'text',
      key: 'placeholder',
      label: 'Placeholder',
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required',
    },
    {
      type: 'select',
      key: 'inputType',
      label: 'Input Type',
      options: [
        {
          value: 'text',
          label: 'Text',
        },
        {
          value: 'number',
          label: 'Number',
        },
        {
          value: 'email',
          label: 'Email',
        },
        {
          value: 'tel',
          label: 'Phone',
        },
      ],
    },
  ],
  component: TextField,
};

const SELECT_FIELD_DEFINATION: FieldTypeDefiniation = {
  type: 'select',
  label: 'Dropdown',
  icon: 'arrow_drop_down_circle',
  defaultConfig: {
    label: 'Select',
    required: false,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label',
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required',
    },
    {
      type: 'dynamic-options',
      key: 'options',
      label: 'Dropdown Options',
    },
  ],
  component: SelectField,
};

const RADIO_FIELD_DEFINATION: FieldTypeDefiniation = {
  type: 'radio',
  label: 'Radio Group',
  icon: 'arrow_drop_down_circle',
  defaultConfig: {
    label: 'Radio',
    required: false,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label',
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required',
    },
    {
      type: 'dynamic-options',
      key: 'options',
      label: 'Radio Options',
    },
  ],
  component: RadioGroupField,
};

const CHECKBOX_FIELD_DEFINATION: FieldTypeDefiniation = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box',
  defaultConfig: {
    label: 'Checkbox',
    required: false,
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label',
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required',
    },
  ],
  component: CheckboxField,
};

const TEXTAREA_FIELD_DEFINATION: FieldTypeDefiniation = {
  type: 'textarea',
  label: 'Text Area',
  icon: 'text_fields',
  defaultConfig: {
    label: 'TextArea',
    required: false,
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label',
    },
    {
      type: 'text',
      key: 'placeholder',
      label: 'Placeholder',
    },
  ],
  component: TextAreaField,
};

const DATE_FIELD_DEFINATION: FieldTypeDefiniation = {
  type: 'date',
  label: 'Date Picker',
  icon: 'calender_today',
  defaultConfig: {
    label: 'Date',
    required: false,
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label',
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required',
    },
  ],
  component: DateField,
};

const TABLE_FIELD_DEFINATION: FieldTypeDefiniation = {
  type: 'table',
  label: 'Table ',
  icon: 'Table',
  defaultConfig: {
    label: 'Table',
    required: false,
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Column Name',
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Without Input',
    },
    {
      type: 'button',
      key: 'addColumn()',
      label: 'Add Column',
    },
  ],
  component: TableField,
};

@Injectable({
  providedIn: 'root',
})
export class FieldTypes {
  fieldTypes = new Map<string, FieldTypeDefiniation>([
    ['text', TEXT_FIELD_DEFINATION],
    ['textarea', TEXTAREA_FIELD_DEFINATION],
    ['checkbox', CHECKBOX_FIELD_DEFINATION],
    ['select', SELECT_FIELD_DEFINATION],
    ['radio', RADIO_FIELD_DEFINATION],
    ['date', DATE_FIELD_DEFINATION],
    ['table', TABLE_FIELD_DEFINATION],
  ]);

  constructor() {}

  getFieldType(type: string): FieldTypeDefiniation | undefined {
    return this.fieldTypes.get(type);
  }

  getAllFieldsValue() {
    return Array.from(this.fieldTypes.values());
  }
}
