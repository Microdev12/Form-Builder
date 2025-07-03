import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Form } from '../../../services/form';
import { FieldTypes } from '../../../services/field-types';
import { FormFields } from '../../../models/fields';

@Component({
  selector: 'app-field-preview',
  imports: [CommonModule, NgComponentOutlet],
  templateUrl: './field-preview.html',
  styleUrl: './field-preview.scss',
})
export class FieldPreview {
  field = input.required<FormFields>();
  fieldTypeService = inject(FieldTypes);
  formServices = inject(Form);

  previewComponent = computed(() => {
    const type = this.fieldTypeService.getFieldType(this.field().type);
    return type?.component ?? null;
  });
}
