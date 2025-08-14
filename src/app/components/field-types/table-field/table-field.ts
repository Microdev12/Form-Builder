import {
  Component,
  inject,
  input,
  Input,
  signal,
  Signal,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormFields } from '../../../models/fields';
import { FormRow } from '../../../models/form';
import { Form } from '../../../services/form';

@Component({
  selector: 'app-table-field',
  imports: [
    MatTableModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIcon,
  ],
  templateUrl: './table-field.html',
  styleUrl: './table-field.scss',
})
export class TableField {
   columnName : string = ''
   field = input.required<FormFields>();

   formService = inject(Form)
//  @Input() field : any
  constructor() {
//console.log(this.field())
  }

  getDisplayedColumns(table: any): string[] {
  return table.columns.map((c : any) => c.field);
}

 addColumn(fieldId: string) {
  const newKey = `col_${Date.now()}`; // or any naming logic
  this.formService.addColumnToTableField(fieldId, newKey);
}

// renameColumn(fieldId: string, oldKey: string, newKey: string) {
//   const trimmedKey = newKey.trim();
//   if (trimmedKey && trimmedKey !== oldKey) {
//     this.formService.renameColumnInTableField(fieldId, oldKey, trimmedKey);
//   }
// }

 renameColumn(fieldId: string, oldCol: string, newCol: string) {
    if (oldCol !== newCol && newCol.trim() !== '') {
     // this.formService.renameColumnInTableField(fieldId, oldCol, newCol.trim());
    }
  }
 
  addRow() {

    console.log('pico')
   // this.tableService.addRow(table)
  }

}
