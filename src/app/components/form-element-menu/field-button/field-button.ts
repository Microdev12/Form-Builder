import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FieldTypeDefiniation } from '../../../models/fields';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-field-button',
  imports: [MatIconModule, DragDropModule],
  templateUrl: './field-button.html',
  styleUrl: './field-button.scss'
})
export class FieldButton {
  field = input.required<FieldTypeDefiniation>()
}
