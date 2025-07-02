import { Component, input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormFields } from '../../../models/fields';
@Component({
  selector: 'app-checkbox-field',
  imports: [MatCheckboxModule],
  templateUrl: './checkbox-field.html',
  styleUrl: './checkbox-field.scss',
})
export class CheckboxField {
  field = input.required<FormFields>();
}
