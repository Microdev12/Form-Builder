import { computed, Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormFields } from '../models/fields';
import { FormField } from '../components/main-canvas/form-field/form-field';

@Injectable({
  providedIn: 'root',
})
export class Form {
  private _rows = signal<FormRow[]>([]);
  private _selectedFieldId = signal<string | null>(null);
  public readonly rows = this._rows.asReadonly();

  public readonly selectedField = computed(() =>
    this._rows()
      .flatMap((row) => row.fields)
      .find((f) => f.id === this._selectedFieldId())
  );

  constructor() {
    this._rows.set([
      {
        id: crypto.randomUUID(),
        sectionName: 'Row',
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

  editRowName(rowId: string, sectionName: string) {
    const rows = this._rows();
    const newRows = rows.map((ele: any) => {
      if (ele.id === rowId) {
        return { ...ele, sectionName }; // return a new object with updated sectionName
      }
      return ele; //
    });
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
      sectionName: 'Row',
      fields: [],
    };
    const rows = this._rows();
    this._rows.set([...rows, newRow]);
  }

  deleteRow(rowId: string) {
    if (this._rows().length === 1) {
      return;
    }
    const rows = this._rows();
    const newRows = rows.filter((row) => row.id !== rowId);
    this._rows.set(newRows);
  }

  moveField(
    fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex: number = -1
  ) {
    const rows = this._rows();

    let fieldToMove: any;
    let sourceRowIndex = -1;
    let sourceFieldIndex = -1;

    rows.forEach((row, rowIndex) => {
      if (row.id === sourceRowId) {
        sourceRowIndex = rowIndex;
        sourceFieldIndex = row.fields.findIndex((f: any) => f.id === fieldId);
        if (sourceFieldIndex >= 0) {
          fieldToMove = row.fields[sourceFieldIndex];
        }
      }
    });

    if (!fieldToMove) return;

    const newRows = [...rows];
    const fieldsWithRemovedFields = newRows[sourceFieldIndex].fields.filter(
      (f) => f.id !== fieldId
    );
    newRows[sourceRowIndex].fields = fieldsWithRemovedFields;

    const targetRowIndex = newRows.findIndex((r) => r.id === targetRowId);
    if (targetRowIndex >= 0) {
      const targetFields = [...newRows[targetRowIndex].fields];
      targetFields.splice(targetIndex, 0, fieldToMove);
      newRows[targetRowIndex].fields = targetFields;
    }

    this._rows.set(newRows);
  }

  setSelectedField(fieldId: string) {
    this._selectedFieldId.set(fieldId);
  }

  updateField(fieldId: string, data: Partial<FormField>) {
    const row = this._rows();
    const newRows = row.map((row) => ({
      ...row,
      fields: row.fields.map((f) => (f.id === fieldId ? { ...f, ...data } : f)),
    }));

    this._rows.set(newRows);
  }
}
