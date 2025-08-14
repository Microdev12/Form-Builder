import { computed, Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormFields } from '../models/fields';
import { FormField } from '../components/main-canvas/form-field/form-field';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
  getFullObject: any;

  constructor(private http: HttpClient) {
    this._rows.set([
      {
        id: crypto.randomUUID(),
        sectionName: 'Row',
        fields: [],
      },
    ]);
  }

  addRow() {
    console.log('called');
    const newRow: FormRow = {
      id: crypto.randomUUID(),
      sectionName: 'Row',
      fields: [],
    };
    const rows = this._rows();
    console.log(this.rows());
    console.log(rows);
    this._rows.set([...rows, newRow]);
    sessionStorage.setItem('data', JSON.stringify([...rows, newRow]));
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

  deleteRow(rowId: string) {
    if (this._rows().length === 1) {
      return;
    }
    const rows = this._rows();
    const newRows = rows.filter((row) => row.id !== rowId);
    this._rows.set(newRows);
    sessionStorage.setItem('data', JSON.stringify(newRows));
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
    sessionStorage.setItem('data', JSON.stringify(newRows));
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
    sessionStorage.setItem('data', JSON.stringify(newRows));
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

  updateTableColumnName(fieldId: any, tableRow: any) {
    console.log(fieldId, tableRow);
    this.getFullObject = this.rows();
    const row = this.rows;
    // const row = this._rows();
    const updateOption = this.getFullObject.map((section: any) => {
      console.log(section);
      section.fields.forEach((field: any) => {
        console.log(field);
        if (field.id === fieldId && field.type === 'table') {
          field.options = [{ ...tableRow.rows[0] }]; // Spread to keep it clean & safe
        }
      });
    });

    this._rows.set(updateOption);
    console.log(updateOption);
  }

  updateField(fieldId: string, data: Partial<FormField>) {
    const row = this._rows();
    const newRows = row.map((row) => ({
      ...row,
      fields: row.fields.map((f) => (f.id === fieldId ? { ...f, ...data } : f)),
    }));

    this._rows.set(newRows);
  }

  private mode$ = new BehaviorSubject<'editor' | 'preview'>('editor');

  setMode(mode: 'editor' | 'preview') {
    this.mode$.next(mode);
  }

  getMode() {
    return this.mode$.asObservable(); // use in components
  }

  get currentMode() {
    return this.mode$.value; // instant value if needed
  }

  saveForm(payload: any) {
    return this.http
      .post(
        'http://localhost:4300/api/busbooking/bus/route/createFormBuilder',
        payload
      )
      .pipe(map((response) => response || 'Success'));
  }

  getForm() {
    return this.http
      .get('http://localhost:4300/api/busbooking/bus/route/getFormBuilder')
      .pipe(map((response) => response || 'Success'));
  }
}
