import { Component, input } from '@angular/core';
import { FormFields } from '../../../models/fields';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-field',
  imports: [MatSelectModule],
  templateUrl: './select-field.html',
  styleUrl: './select-field.scss',
})
export class SelectField {
  field = input.required<FormFields>();
}
