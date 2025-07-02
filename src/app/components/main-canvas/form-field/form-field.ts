import { Component, computed, inject, input } from '@angular/core';
import { FormFields } from '../../../models/fields';
import { FieldTypes } from '../../../services/field-types';
import { MatButtonModule } from '@angular/material/button';
import {
  CommonModule,
  NgComponentOutlet,
  TitleCasePipe,
} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Form } from '../../../services/form';
@Component({
  selector: 'app-form-field',
  imports: [NgComponentOutlet, TitleCasePipe, MatButtonModule, MatIconModule],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  field = input.required<FormFields>();

  fieldTypeService = inject(FieldTypes);
  formServices = inject(Form);

  previewComponent = computed(() => {
    const type = this.fieldTypeService.getFieldType(this.field().type);
    return type?.component ?? null;
  });

  deleteField(e: Event) {
    e.stopPropagation();
    this.formServices.deleteField(this.field().id);
  }
}
