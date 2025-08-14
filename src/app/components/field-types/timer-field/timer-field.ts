import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatTimepickerModule,
  MatTimepickerOption,
} from '@angular/material/timepicker';
import { FormFields } from '../../../models/fields';

@Component({
  selector: 'app-timer-field',
  imports: [MatFormFieldModule, MatInputModule, MatTimepickerModule],
  templateUrl: './timer-field.html',
  styleUrl: './timer-field.scss',
})
export class TimerField {
  field = input.required<FormFields>();
}
