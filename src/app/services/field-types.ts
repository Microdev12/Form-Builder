import { Injectable } from '@angular/core';
import { FieldTypeDefiniation } from '../models/fields';


const TEXT_FIELD_DEFINATION = {
  type : 'text',
  label : 'Text Field',
  icon : 'text_fields'
}

const CHECKBOX_FIELD_DEFINATION = {
  type : 'checkbox',
  label : 'Checkbox',
  icon : 'check_box'
}

@Injectable({
  providedIn: 'root'
})
export class FieldTypes {
 
  fieldTypes = new Map<string, FieldTypeDefiniation>([
    ['text', TEXT_FIELD_DEFINATION],['checkbox', CHECKBOX_FIELD_DEFINATION]
  ])

  constructor() { }
   
  getAllFieldsValue() {
    return Array.from(this.fieldTypes.values())
  }

}
