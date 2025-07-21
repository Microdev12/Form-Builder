import { Component, computed, inject, input } from '@angular/core';
import { FormFields } from '../../../models/fields';
import { FieldTypes } from '../../../services/field-types';
import { MatButtonModule } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Form } from '../../../services/form';
import { FieldPreview } from '../field-preview/field-preview';
@Component({
  selector: 'app-form-field',
  imports: [TitleCasePipe, MatButtonModule, MatIconModule, FieldPreview],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  field = input.required<FormFields>();
  //active = input.required<any>();
  // fieldTypeService = inject(FieldTypes);
  formServices = inject(Form);

  deleteField(e: Event) {
    e.stopPropagation();
    this.formServices.deleteField(this.field().id);
  }
}
