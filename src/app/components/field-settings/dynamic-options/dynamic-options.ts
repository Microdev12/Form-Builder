import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OptionItem } from '../../../models/fields';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dynamic-options',
  imports: [MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule],
  templateUrl: './dynamic-options.html',
  styleUrl: './dynamic-options.scss'
})
export class DynamicOptions {
  title = input('')
  options = input.required<OptionItem[]>();
  optionsChange = output<OptionItem[]>()

  addOption() {
    const currentOptions = this.options();
    const newOptions = [...currentOptions]
    newOptions.push({
      label: `Option ${newOptions.length + 1}`,
      value: `Option ${newOptions.length + 1}`
    })

    this.optionsChange.emit(newOptions)
  }

  removeOption(index: number) {
    const currentOptions = this.options()
    const newOptions = [...currentOptions]
    newOptions.splice(index, 1)
    this.optionsChange.emit(newOptions)
  }

  updateOption(index: number, newLabel: string) {
    const currentOptions = this.options()
    const newOptions = [...currentOptions];
    newOptions[index] = {
      ...newOptions[index], label: newLabel
    }

    this.optionsChange.emit(newOptions)
  }


}
