import { Component, inject } from '@angular/core';
import { FieldTypes } from '../../services/field-types';
import { FieldButton } from './field-button/field-button';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-element-menu',
  imports: [FieldButton, DragDropModule],
  templateUrl: './form-element-menu.html',
  styleUrl: './form-element-menu.scss',
})
export class FormElementMenu {
  fieldTypesService = inject(FieldTypes);
  fieldTypes = this.fieldTypesService.getAllFieldsValue();

  constructor() {
    console.log(this.fieldTypes);
  }

  noDropAllowed(item: CdkDrag<any>) {
    return false;
  }
}
