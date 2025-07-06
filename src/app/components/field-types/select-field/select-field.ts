import { Component, input } from '@angular/core';
import { FormFields } from '../../../models/fields';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-select-field',
  imports: [MatSelectModule, MatFormFieldModule],
  templateUrl: './select-field.html',
  styleUrl: './select-field.scss',
})
export class SelectField {
  field = input.required<FormFields>();
}
