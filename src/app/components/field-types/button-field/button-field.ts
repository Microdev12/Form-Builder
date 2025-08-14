import { Component, input } from '@angular/core';
import { FormFields } from '../../../models/fields';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-field',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './button-field.html',
  styleUrl: './button-field.scss',
})
export class ButtonField {
  field = input.required<FormFields>();
}
