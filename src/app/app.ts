import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FieldSettings } from './components/field-settings/field-settings';
import { FormElementMenu } from './components/form-element-menu/form-element-menu';
import { MainCanvas } from './components/main-canvas/main-canvas';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { FinalForms } from './components/final-forms/final-forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    FieldSettings,
    FormElementMenu,
    MainCanvas,
    DragDropModule,
    CommonModule,
    MatButtonModule,
    FinalForms,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'forms';
  show: boolean = true;

  constructor(private router: Router) {}

  onNavigate() {
    this.show = false;
    // console.log('calling Data');
    // this.router.navigate(['/new-page']);
  }
}
