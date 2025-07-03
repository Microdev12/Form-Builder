import { Component, inject } from '@angular/core';
import { Form } from '../../../services/form';
import { FieldPreview } from '../field-preview/field-preview';

@Component({
  selector: 'app-form-preview',
  imports: [FieldPreview],
  templateUrl: './form-preview.html',
  styleUrl: './form-preview.scss',
})
export class FormPreview {
  formService = inject(Form);
}
