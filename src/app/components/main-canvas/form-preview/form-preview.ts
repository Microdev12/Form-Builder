import { Component, inject } from '@angular/core';
import { Form } from '../../../services/form';
import { FieldPreview } from '../field-preview/field-preview';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-form-preview',
  imports: [FieldPreview, MatCardModule],
  templateUrl: './form-preview.html',
  styleUrl: './form-preview.scss',
})
export class FormPreview {
  formService = inject(Form);
}
