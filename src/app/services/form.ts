import { computed, Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormFields } from '../models/fields';
import { FormField } from '../components/main-canvas/form-field/form-field';
import { BehaviorSubject, map, Observable } from 'rxjs';

// function sanitizeFields(rows: any[]): any[] {
//   return rows.map(row => ({
//     ...row,
//     fields: row.fields.map((field: any) => {
//       if (field.type === 'table') {
//         // TableField: options must be array of objects, not OptionItem
//         let options: { [key: string]: string }[] = Array.isArray(field.options)
//           ? field.options.filter((opt: any) => typeof opt === 'object' && !('label' in opt && 'value' in opt))
//           : [];
//         return {
//           ...field,
//           type: 'table',
//           options,
//           columns: Array.isArray(field.columns) ? field.columns : [],
//         } as TableField;
//       } else {
//         // StandardField: options must be OptionItem[]
//         let options: OptionItem[] = Array.isArray(field.options)
//           ? field.options.filter((opt: any): opt is OptionItem => typeof opt === 'object' && 'label' in opt && 'value' in opt)
//           : [];
//         return {
//           ...field,
//           type: field.type,
//           options,
//         } as StandardField;
//       }
//     })
//   }));
// }

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
    this._rows.set([...rows, newRow] as unknown as FormRow[]);
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
    // Type guard for TableField
    if (field.type === 'table') {
      // Ensure options is an array of objects (not OptionItem)
      if (
        !Array.isArray(field.options) ||
        field.options.some((opt) => 'label' in opt && 'value' in opt)
      ) {
        field.options = [];
      }
      // Ensure columns exists
      if (!('columns' in field)) {
        (field as any).columns = [];
      }
    } else {
      // StandardField: ensure options is OptionItem[]
      if (
        field.options &&
        field.options.some((opt) => !('label' in opt && 'value' in opt))
      ) {
        field.options = [];
      }
    }
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
    this._rows.set(newRows as unknown as FormRow[]);
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

  updateField(fieldId: string, data: Partial<FormField>) {
    const row = this._rows();
    const newRows = row.map((row) => ({
      ...row,
      fields: row.fields.map((f) => {
        if (f.id === fieldId) {
          // Type guard for TableField
          if (
            f.type === 'table' &&
            'options' in data &&
            Array.isArray(data.options)
          ) {
            // Only allow array of objects for table field options
            if (data.options.some((opt) => 'label' in opt && 'value' in opt)) {
              return { ...f, ...data, options: [] };
            }
          } else if (
            f.type !== 'table' &&
            'options' in data &&
            Array.isArray(data.options)
          ) {
            // Only allow OptionItem[] for standard field options
            if (
              data.options.some((opt) => !('label' in opt && 'value' in opt))
            ) {
              return { ...f, ...data, options: [] };
            }
          }
          return { ...f, ...data };
        }
        return f;
      }),
    }));
    this._rows.set(newRows as unknown as FormRow[]);
  }

  // Column Logic

  addColumnToTableField(fieldId: string, newColumnKey: string) {
    const rows = this._rows();
    const updatedRows = rows.map((row) => {
      const updatedFields = row.fields.map((f) => {
        if (f.id === fieldId && f.type === 'table') {
          // Ensure columns array exists
          const columns = f.columns ?? [];
          const newColumns = [...columns, newColumnKey];

          // Ensure options array exists (row data)
          const options = Array.isArray(f.options) ? f.options : [];

          // Add the new column key to each row's data with empty value
          const updatedOptions = options.map((rowObj) => ({
            ...rowObj,
            [newColumnKey]: '',
          }));

          return {
            ...f,
            columns: newColumns,
            options: updatedOptions,
          };
        }
        return f;
      });

      return { ...row, fields: updatedFields };
    });

    this._rows.set(updatedRows);
    sessionStorage.setItem('data', JSON.stringify(updatedRows));
  }

  renameColumnInTableField(fieldId: string, oldKey: string, newKey: string) {
    const rows = this._rows();
    const updatedRows = rows.map((row) => {
      const updatedFields = row.fields.map((f) => {
        if (f.id === fieldId && f.type === 'table') {
          const newColumns =
            f.columns?.map((c) => (c === oldKey ? newKey : c)) ?? [];

          const newOptions = (f.options ?? []).map((rowObj) => {
            const { [oldKey]: oldValue, ...rest } = rowObj as any;
            return { ...rest, [newKey]: oldValue };
          });

          return {
            ...f,
            columns: newColumns,
            options: newOptions,
          };
        }
        return f;
      });
      return { ...row, fields: updatedFields };
    });

    this._rows.set(updatedRows);
    console.log(this.rows());
    sessionStorage.setItem('data', JSON.stringify(updatedRows));
  }

  deleteColumnFromTableField(fieldId: string, columnKey: string) {
    const rows = this._rows();
    const updatedRows = rows.map((row) => {
      const updatedFields = row.fields.map((f) => {
        if (f.id === fieldId && f.type === 'table') {
          const newColumns = (f.columns ?? []).filter((c) => c !== columnKey);

          const newOptions = (f.options ?? []).map((rowObj) => {
            const { [columnKey]: _, ...rest } = rowObj as any;
            return rest;
          });

          return {
            ...f,
            columns: newColumns,
            options: newOptions,
          };
        }
        return f;
      });
      return { ...row, fields: updatedFields };
    });

    this._rows.set(updatedRows);
    sessionStorage.setItem('data', JSON.stringify(updatedRows));
  }

  addRowToTableField(fieldId: string) {
    const rows = this._rows();
    const updatedRows = rows.map((row) => {
      const updatedFields = row.fields.map((f) => {
        if (f.id === fieldId && f.type === 'table') {
          // Ensure options array exists
          const options = Array.isArray(f.options) ? f.options : [];

          // Create a new row object with all columns empty
          const newRow: any = {};
          (f.columns ?? []).forEach((col) => {
            newRow[col] = '';
          });

          return {
            ...f,
            options: [...options, newRow],
          };
        }
        return f;
      });

      return { ...row, fields: updatedFields };
    });
    console.log(this.rows());
    this._rows.set(updatedRows);
    sessionStorage.setItem('data', JSON.stringify(updatedRows));
  }

  deleteRowFromTableField(fieldId: string, rowIndex: number) {
    const rows = this._rows();
    const updatedRows = rows.map((row) => {
      const updatedFields = row.fields.map((f) => {
        if (f.id === fieldId && f.type === 'table') {
          const options = Array.isArray(f.options) ? f.options : [];
          return {
            ...f,
            options: options.filter((_, idx) => idx !== rowIndex),
          };
        }
        return f;
      });
      return { ...row, fields: updatedFields };
    });

    this._rows.set(updatedRows);
    sessionStorage.setItem('data', JSON.stringify(updatedRows));
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

  //  private _rows$ = new BehaviorSubject<FormRow[]>([
  //   {
  //     id: crypto.randomUUID(),
  //     sectionName: 'Row',
  //     fields: [],
  //   },
  // ]);

  // private _selectedFieldId$ = new BehaviorSubject<string | null>(null);

  // // Expose rows as observable
  // public readonly rows$: Observable<FormRow[]> = this._rows$.asObservable();

  // // Selected field observable
  // public readonly selectedField$: Observable<FormFields | undefined> = this._rows$.pipe(
  //   map((rows) =>
  //     rows.flatMap((row) => row.fields).find((f) => f.id === this._selectedFieldId$.value)
  //   )
  // );

  // constructor() {}

  // addRow() {
  //   const newRow: FormRow = {
  //     id: crypto.randomUUID(),
  //     sectionName: 'Row',
  //     fields: [],
  //   };
  //   const updatedRows = [...this._rows$.value, newRow];
  //   this._rows$.next(updatedRows);
  //   sessionStorage.setItem('data', JSON.stringify(updatedRows));
  // }

  // editRowName(rowId: string, sectionName: string) {
  //   const newRows = this._rows$.value.map((row) =>
  //     row.id === rowId ? { ...row, sectionName } : row
  //   );
  //   this._rows$.next(newRows);
  // }

  // deleteRow(rowId: string) {
  //   if (this._rows$.value.length === 1) return;

  //   const newRows = this._rows$.value.filter((row) => row.id !== rowId);
  //   this._rows$.next(newRows);
  //   sessionStorage.setItem('data', JSON.stringify(newRows));
  // }

  // addField(field: FormFields, rowId: string, index?: number) {
  //   const newRows = this._rows$.value.map((row) => {
  //     if (row.id === rowId) {
  //       const updatedFields = [...row.fields];
  //       if (index !== undefined) {
  //         updatedFields.splice(index, 0, field);
  //       } else {
  //         updatedFields.push(field);
  //       }
  //       return { ...row, fields: updatedFields };
  //     }
  //     return row;
  //   });

  //   this._rows$.next(newRows);
  //   sessionStorage.setItem('data', JSON.stringify(newRows));
  // }

  // deleteField(fieldId: string) {
  //   const newRows = this._rows$.value.map((row) => ({
  //     ...row,
  //     fields: row.fields.filter((f) => f.id !== fieldId),
  //   }));

  //   this._rows$.next(newRows);
  //   sessionStorage.setItem('data', JSON.stringify(newRows));
  // }

  // moveField(
  //   fieldId: string,
  //   sourceRowId: string,
  //   targetRowId: string,
  //   targetIndex: number = -1
  // ) {
  //   const rows = this._rows$.value;
  //   let fieldToMove: FormFields | undefined;
  //   let sourceRowIndex = -1;

  //   rows.forEach((row, rowIndex) => {
  //     if (row.id === sourceRowId) {
  //       sourceRowIndex = rowIndex;
  //       const fieldIndex = row.fields.findIndex((f) => f.id === fieldId);
  //       if (fieldIndex >= 0) {
  //         fieldToMove = row.fields[fieldIndex];
  //         rows[rowIndex].fields.splice(fieldIndex, 1);
  //       }
  //   });

  //   if (!fieldToMove) return;

  //   const targetRowIndex = rows.findIndex((r) => r.id === targetRowId);
  //   if (targetRowIndex >= 0) {
  //     const targetFields = [...rows[targetRowIndex].fields];
  //     targetFields.splice(targetIndex, 0, fieldToMove);
  //     rows[targetRowIndex].fields = targetFields;
  //   }

  //   this._rows$.next([...rows]);
  // }

  // setSelectedField(fieldId: string) {
  //   this._selectedFieldId$.next(fieldId);
  // }

  // updateField(fieldId: string, data: Partial<FormField>) {
  //   const newRows = this._rows$.value.map((row) => ({
  //     ...row,
  //     fields: row.fields.map((f) => (f.id === fieldId ? { ...f, ...data } : f)),
  //   }));

  //   this._rows$.next(newRows);
  // }

  // private _mode$ = new BehaviorSubject<'editor' | 'preview'>('editor');

  // setMode(mode: 'editor' | 'preview') {
  //   this._mode$.next(mode);
  // }

  // getMode(): Observable<'editor' | 'preview'> {
  //   return this._mode$.asObservable();
  // }

  // get currentMode(): 'editor' | 'preview' {
  //   return this._mode$.value;
  // }
}

// @Injectable({ providedIn: 'root' })
// export class TableService {
//   private _tables = signal<TableData[]>([]);
//   public tables = this._tables.asReadonly();

//   addTable() {
//     this._tables.update(tables => [
//       ...tables,
//       {
//         id: crypto.randomUUID(),
//         columns: [{ id: crypto.randomUUID(), header: 'Column 1', field: 'col1' }],
//         rows: [{ col1: '' }]
//       }
//     ]);
//   }

//   addColumn(tableId: string) {
//     this._tables.update(tables =>
//       tables.map(table =>
//         table.id === tableId
//           ? {
//               ...table,
//               columns: [
//                 ...table.columns,
//                 { id: crypto.randomUUID(), header: `Column ${table.columns.length + 1}`, field: `col${table.columns.length + 1}` }
//               ],
//               rows: table.rows.map(row => ({
//                 ...row,
//                 [`col${table.columns.length + 1}`]: ''
//               }))
//             }
//           : table
//       )
//     );
//   }

//   addRow(tableId: string) {
//     this._tables.update(tables =>
//       tables.map(table =>
//         table.id === tableId
//           ? {
//               ...table,
//               rows: [
//                 ...table.rows,
//                 Object.fromEntries(table.columns.map(col => [col.field, '']))
//               ]
//             }
//           : table
//       )
//     );
//   }

//   removeColumn(tableId: string, columnId: string) {
//     this._tables.update(tables =>
//       tables.map(table =>
//         table.id === tableId
//           ? {
//               ...table,
//               columns: table.columns.filter(c => c.id !== columnId),
//               rows: table.rows.map(row => {
//                 const newRow = { ...row };
//                 delete newRow[columnId];
//                 return newRow;
//               })
//             }
//           : table
//       )
//     );
//   }
// }
