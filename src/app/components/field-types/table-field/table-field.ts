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
    MatIcon,
  ],
  templateUrl: './table-field.html',
  styleUrl: './table-field.scss',
})
export class TableField {
  ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
  ];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  //@Input({ required: true }) activeTab!: 'preview' | 'editor';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  formServices = inject(Form);
  formConfig = signal<FormRow[]>(this.formServices.rows());
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

  get rows(): FormArray {
    return this.tableForm.get('rows') as FormArray;
  }

  addColumn(fieldId?: any) {
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

    this.formConfig.set(updated);
    console.log(this.formConfig());
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
