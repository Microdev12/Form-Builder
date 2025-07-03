import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FieldSettings } from './components/field-settings/field-settings';
import { FormElementMenu } from './components/form-element-menu/form-element-menu';
import { MainCanvas } from './components/main-canvas/main-canvas';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [FieldSettings, FormElementMenu, MainCanvas, DragDropModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'forms';
}
