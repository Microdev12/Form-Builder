import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule],
  templateUrl: './form-editor.html',
  styleUrl: './form-editor.scss'
})
export class FormEditor {
   onDropRowEvent(event: CdkDragDrop<any>) {
     console.log(event)
     if(event.previousContainer.data === 'field-selector') {
    
      return
     }
   }
}
