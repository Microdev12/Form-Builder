import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { Form } from '../../../services/form';
import { FieldTypeDefiniation, FormFields } from '../../../models/fields';
import { FormField } from '../form-field/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule, FormField, MatButtonModule, MatIconModule],
  templateUrl: './form-editor.html',
  styleUrl: './form-editor.scss',
})
export class FormEditor {
  formService = inject(Form);

  onDropRowEvent(event: CdkDragDrop<any>, rowId: string) {
    console.log(event);
    if (event.previousContainer.data === 'field-selector') {
      const fieldType = event.item.data as FieldTypeDefiniation;
      console.log(fieldType);
      const newField: FormFields = {
        id: crypto.randomUUID(),
        type: fieldType.type,
        ...fieldType.defaultConfig,
      };

      this.formService.addField(newField, rowId, event.currentIndex);
      return;
    }
 
    const dragData = event.item.data as FormFields;
    const previousRowId = event.previousContainer.data as string
    console.log(dragData, previousRowId)
    this.formService.moveField(dragData.id, previousRowId, rowId, event.currentIndex)
  }
}
