import { Component, computed, inject } from '@angular/core';
import { Form } from '../../services/form';
import { FieldTypes } from '../../services/field-types';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DynamicOptions } from './dynamic-options/dynamic-options';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-field-settings',
  imports: [
    DynamicOptions,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './field-settings.html',
  styleUrl: './field-settings.scss',
})
export class FieldSettings {
  formService = inject(Form);

  fieldTypeServie = inject(FieldTypes);

  fieldSetting = computed(() => {
    const field = this.formService.selectedField();
    if (!field) return [];

    const fieldDef = this.fieldTypeServie.getFieldType(field.type);
    return fieldDef?.settingsConfig || [];
  });

  fieldValues = computed(() => {
    const field = this.formService.selectedField();
    if (!field) return [];
    return field as any;
  });

  updateField(fieldId: string, key: string, value: any) {
    this.formService.updateField(fieldId, { [key]: value });
  }
}
