import { Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormFields } from '../models/fields';

@Injectable({
  providedIn: 'root',
})
export class Form {
  private _rows = signal<FormRow[]>([]);
  public readonly rows = this._rows.asReadonly();

  constructor() {
    this._rows.set([
      {
        id: crypto.randomUUID(),
        fields: [],
      },
    ]);
  }

  addField(field: FormFields, rowId: string, index?: number) {
    const rows = this._rows();
    console.log(rows, 'bahar wala');
    const newRows = rows.map((ele: any) => {
      if (ele.id === rowId) {
        const updatedFields = [...ele.fields];
        console.log(updatedFields, 'updatedFields');
        if (index !== undefined) {
          updatedFields.splice(index, 0, field);
        } else {
          updatedFields.push(field);
        }
        return { ...ele, fields: updatedFields };
      }
      return ele;
    });
    console.log(newRows);
    this._rows.set(newRows);
  }

  deleteField(fieldId: string) {
    const rows = this._rows();
    console.log(rows, 'bahar wala');
    const newRows = rows.map((row) => ({
      ...row,
      fields: row.fields.filter((f) => f.id !== fieldId),
    }));
    console.log(newRows, 'New Rows');
    this._rows.set(newRows);
  }

  addRow() {
    console.log('called');
    const newRow: FormRow = {
      id: crypto.randomUUID(),
      fields: [],
    };

    const rows = this._rows();
    this._rows.set([...rows, newRow]);
  }
}
