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
import { Form } from '../../../services/form';
import { FormFields } from '../../../models/fields';
import { FormRow } from '../../../models/form';

@Component({
  selector: 'app-table-field',
  imports: [
    MatTableModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './table-field.html',
  styleUrl: './table-field.scss',
})
export class TableField {
  ELEMENT_DATA = [];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  //@Input({ required: true }) activeTab!: 'preview' | 'editor';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  formServices = inject(Form);
  //  formConfig = signal<FormRow[]>(this.formServices.rows());
  //field = input.required
  sub: any;
  isEditorMode: boolean = false;
  getFullObject: any;
  field = input.required<FormFields>();
  //fields = input.required<>();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  tableForm: FormGroup;
  columns: { key: string; label: string; isEditing: boolean }[] = [];

  constructor(private fb: FormBuilder) {
    //console.log(this.fields()?.id);
    this.getFullObject = this.formServices.rows();

    console.log(this.getFullObject);
    this.tableForm = this.fb.group({
      rows: this.fb.array([]),
    });

    this.sub = this.formServices.getMode().subscribe((mode) => {
      this.isEditorMode = mode === 'editor';
    });

    this.addColumn();
    this.addRow();
  }

  // @Input() field: any;
  // @Input() form: FormGroup;

  get displayedColumns(): string[] {
    return this.field().options?.length
      ? Object.keys(this.field().options[0])
      : [];
  }

  // get dataSource() {
  //   return this.field().options || [];
  // }

  get rows(): FormArray {
    return this.tableForm.get('rows') as FormArray;
  }

  addColumn(fieldId?: any, columnId?: any) {
    console.log(fieldId, columnId);
    const key = `col_${this.columns.length + 1}`;
    const label = `Column ${this.columns.length + 1}`;
    this.columns.push({ key, label, isEditing: false });

    this.rows.controls.forEach((row: any) => {
      row.addControl(key, new FormControl(''));
    });

    // if (fieldId != undefined) {
    //   this.getFullObject.forEach((ele: any) => {
    //     if (ele.id == fieldId) {
    //       const updatedField = [...ele.field];
    //       updatedField.map((field: any) => {
    //         if (field.type == 'table') {
    //           let obj = {
    //             ...field,
    //             options: [...this.columns],
    //           };
    //           return obj;
    //         }
    //       });
    //     }
    //   });
    // }
    console.log(this.tableForm.value);
    const updated = this.getFullObject.map((section: any) => ({
      ...section,
      fields: section.fields.map((field: any) => {
        if (field.type === 'table') {
          return {
            ...field,
            options: {
              ...this.tableForm.value,
            },
          };
        }
        return field;
      }),
    }));

    // console.log(this.formConfig());
    this.formServices.updateTableColumnName(fieldId, this.tableForm.value);
  }

  removeColumn(index: number) {
    const key = this.columns[index].key;
    this.columns.splice(index, 1);
    this.rows.controls.forEach((row: any) => {
      row.removeControl(key);
    });
  }

  addRow() {
    const group = this.fb.group({});
    this.columns.forEach((col) => {
      group.addControl(col.key, new FormControl(''));
    });
    this.rows.push(group);
  }

  removeRow(index: number) {
    this.rows.removeAt(index);
  }

  editColumn(col: any) {
    col.isEditing = true;
  }

  saveColumn(col: any, event: Event) {
    const input = (event.target as HTMLInputElement)?.value?.trim();
    if (input) {
      col.label = input;
      col.key = input;
    }
    col.isEditing = false;
  }

  updateColumnKeyAndLabel(col: any, newName: string) {
    const oldKey = col.key;
    const trimmedKey = newName.trim().replace(/\s+/g, '_'); // convert to valid key

    if (!trimmedKey) {
      alert('Column name cannot be empty');
      return;
    }

    // Check for duplicate key
    const duplicate = this.columns.find(
      (c) => c.key === trimmedKey && c !== col
    );
    if (duplicate) {
      alert(`A column with key "${trimmedKey}" already exists.`);
      return;
    }

    // Update the column metadata
    col.key = trimmedKey;
    col.label = newName.trim();
    col.isEditing = false;

    // Rename control key in every row
    this.rows.controls.forEach((row: any) => {
      const value = row.get(oldKey)?.value;
      row.removeControl(oldKey);
      row.addControl(trimmedKey, new FormControl(value));
    });
  }

  displayedColumnKeys() {
    let columnsData = this.columns.map((c) => c.key);
    return this.columns.map((c) => c.key);
  }

  submit() {
    console.log(this.tableForm.value);
  }
}
