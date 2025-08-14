import { Component, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormRow } from '../../models/form';
import { Form } from '../../services/form';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FieldPreview } from '../main-canvas/field-preview/field-preview';
import { FormFields } from '../../models/fields';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-final-forms',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FieldPreview,
  ],
  templateUrl: './final-forms.html',
  styleUrl: './final-forms.scss',
})
export class FinalForms {
  formService = inject(Form);
  //field = input.required<FormFields>();
  //activeTab = input.required<any>();
  sections: FormRow[] = [];
  form!: FormGroup;

  rows: FormRow[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // this.rows = JSON.parse(sessionStorage.getItem('data') || '[]');
    this.getFormValues();
  }

  ngOnInit(): void {
    // console.log(this.rows);
    // this.sections = this.addControlNames(this.rows);
    // console.log(this.sections);
    // this.getFormValues();
  }

  getFormValues() {
    this.formService.getForm().subscribe(
      (response: any) => {
        console.log(response[response.length - 1].data);
        this.rows = response[response.length - 1].data;
        this.sections = this.addControlNames(this.rows);
        this.buildForm();
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }

  addControlNames(sections: FormRow[]): FormRow[] {
    const typeCount: Record<string, number> = {};

    return sections.map((section, sectionIndex) => {
      const updatedFields = section.fields.map((field) => {
        const key = `${field.type}Field`;
        typeCount[key] = (typeCount[key] || 0) + 1;
        return {
          ...field,
          controlName: `${field.type}Field${typeCount[key]}`,
        };
      });

      return {
        ...section,
        fields: updatedFields,
      };
    });
  }

  buildForm(): void {
    const group: any = {};
    this.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === 'checkbox') {
          group[field.controlName] = new FormControl(false);
        } else {
          group[field.controlName] = new FormControl(
            '',
            field.required ? Validators.required : null
          );
        }
      });
    });
    this.form = new FormGroup(group);
  }

  onSubmit() {
    console.log('Form values:', this.form.value);
  }
}
