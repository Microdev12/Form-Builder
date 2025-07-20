import { Component, inject, signal } from '@angular/core';
import { FormEditor } from './form-editor/form-editor';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormPreview } from './form-preview/form-preview';
import { MatIconModule } from '@angular/material/icon';
import { Form } from '../../services/form';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main-canvas',
  imports: [
    FormEditor,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    FormPreview,
    RouterModule,
  ],
  templateUrl: './main-canvas.html',
  styleUrl: './main-canvas.scss',
})
export class MainCanvas {
  formService = inject(Form);
  show: string = 'editor';
  // show: string = 'editor';
  // activeTab$ = new BehaviorSubject<'editor' | 'preview'>('editor');
  // activeTab = signal<'preview' | 'editor'>('editor');
  onTabChange(tab: 'editor' | 'preview') {
    // this.activeTab.set(tab);
    this.show = tab;
    // this.activeTab$.next(tab);
    this.formService.setMode(tab);
  }
}
