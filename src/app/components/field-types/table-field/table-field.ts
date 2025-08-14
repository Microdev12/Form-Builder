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
  columnName: string = '';
  field = input.required<FormFields>();
  formService = inject(Form);
  editableColumnNames: string[] = [];
  editingColumn: any;
  mode: string = 'editor';

  constructor() {
    this.formService.getMode().subscribe((mode) => {
      console.log('Mode changed:', mode);
      this.mode = mode;
    });
  }

  ngOnInit() {
    const cols = this.field().columns ?? [];
    this.editableColumnNames = [...cols];
    this.editingColumn = new Array(cols.length).fill(false);
  }

  startEditing(index: number) {
    this.editingColumn[index] = true;
  }

  private syncEditingArray() {
    const cols = this.field().columns ?? [];
    this.editingColumn = new Array(cols.length).fill(false);
  }

  saveColumnName(
    fieldId: string,
    oldKey: string,
    newName: string,
    index: number
  ) {
    if (newName && oldKey !== newName) {
      this.renameColumn(fieldId, oldKey, newName);
    }
    this.editingColumn[index] = false; // hide input
  }
  getDisplayedColumns(table: any): string[] {
    return table.columns.map((c: any) => c.field);
  }

  addColumn(fieldId: string) {
    const newKey = `col_${Date.now()}`; // or any naming logic
    this.formService.addColumnToTableField(fieldId, newKey);
    this.syncEditingArray();
  }

  renameColumn(fieldId: string, oldKey: string, newName: string) {
    if (!newName || oldKey === newName) return;

    this.formService.renameColumnInTableField(fieldId, oldKey, newName);
    this.syncEditingArray();
  }

  deleteColumn(fieldId: string, columnKey: string) {
    this.formService.deleteColumnFromTableField(fieldId, columnKey);
  }

  addRow() {
    console.log('pico');
    this.formService.addRowToTableField(this.field().id);
  }

  deleteRow(fieldId: string, rowIndex: number) {
    this.formService.deleteRowFromTableField(fieldId, rowIndex);
  }
}
