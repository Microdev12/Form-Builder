import { Component, inject, Input, Signal } from '@angular/core';
import { Form } from '../../../services/form';
import { FieldPreview } from '../field-preview/field-preview';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-form-preview',
  imports: [FieldPreview, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './form-preview.html',
  styleUrl: './form-preview.scss',
})
export class FormPreview {
  formService = inject(Form);
  // @Input() activeTab!: Signal<'preview' | 'editor'>;
  save() {
    console.log(this.formService.rows())
  }
}
