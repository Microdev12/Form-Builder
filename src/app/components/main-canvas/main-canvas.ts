import { Component, inject, signal } from '@angular/core';
import { FormEditor } from './form-editor/form-editor';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormPreview } from './form-preview/form-preview';
import { MatIconModule } from '@angular/material/icon';
import { Form } from '../../services/form';

@Component({
  selector: 'app-main-canvas',
  imports: [
    FormEditor,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    FormPreview,
  ],
  templateUrl: './main-canvas.html',
  styleUrl: './main-canvas.scss',
})
export class MainCanvas {
  activeTab = signal<'preview' | 'editor'>('editor');
  formService = inject(Form);
}
