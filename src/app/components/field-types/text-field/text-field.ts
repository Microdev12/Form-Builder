import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormFields } from '../../../models/fields';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-text-field',
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
})
export class TextField {
  field = input.required<FormFields>();
}
