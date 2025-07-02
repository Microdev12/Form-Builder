import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { Form } from '../../../services/form';
import { FieldTypeDefiniation, FormFields } from '../../../models/fields';
import { FormField } from '../form-field/form-field';

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule, FormField],
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
  }
}
