import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormFields } from '../../../models/fields';
@Component({
  selector: 'app-text-area-field',
  imports: [MatInputModule, MatFormFieldModule],
  templateUrl: './text-area-field.html',
  styleUrl: './text-area-field.scss'
})
export class TextAreaField {
   field = input.required<FormFields>();
}
