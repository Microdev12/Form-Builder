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
    const newRows = rows.map((ele: any) => {
      if (ele.id === rowId) {
        const updatedFields = [...ele.fields];
        if (index !== undefined) {
          updatedFields.splice(index, 0, field);
        } else {
          updatedFields.push(field);
        }
        return { ...ele, fields: updatedFields };
      }
      return ele;
    });

    this._rows.set(newRows);
  }

  deleteField(fieldId: string) {
    const rows = this._rows();
    const newRows = rows.map((row) => ({
      ...row,
      fields: row.fields.filter((f) => f.id !== fieldId),
    }));

    this._rows.set(newRows);
  }
}
