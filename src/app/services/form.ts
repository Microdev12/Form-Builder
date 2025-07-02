import { Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormField } from '../models/fields';

@Injectable({
  providedIn: 'root'
})
export class Form {
  
  private _rows = signal<FormRow[]>([]);
  public readonly row = this._rows.asReadonly();

  constructor() { 
    this._rows.set([{
      id : crypto.randomUUID(),
      fields : [],
    }])
  }

  addField(field : FormField, rowId : string , index? : number) {
    const rows = this._rows();
    const newRows = rows.map((ele : any) => {
      if(ele.id === rowId) {
       const updatedFields = [...ele.fields];
       if(index !== undefined) {
         updatedFields.splice(index, 0, field)
       }else {
         updatedFields.push(field)
       }
       return {...ele , field : updatedFields}
      }
      return ele;
    })

    this._rows.set(newRows)
  }

  



}
