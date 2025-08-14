import { Component, input } from '@angular/core';
import { FormFields } from '../../../models/fields';
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-radio-group-field',
  imports: [MatRadioModule],
  templateUrl: './radio-group-field.html',
  styleUrl: './radio-group-field.scss'
})
export class RadioGroupField {
  field = input.required<FormFields>();

 //
}
