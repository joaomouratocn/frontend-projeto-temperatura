import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ValidateDateDirective } from '../../directives/validate-date.directive';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input-data',
  imports: [CommonModule, ValidateDateDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDataComponent),
      multi: true,
    },
  ],
  templateUrl: './input-data.component.html',
  styleUrl: './input-data.component.css',
})
export class InputDataComponent implements ControlValueAccessor {
  @Input() labelName: string = '';
  @Input() labelText: string = '';
  @Input() placeHolder: string = '';
  @Input() showError: boolean = false;
  @Input() pErrorText: string = '';

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  writeValue(obj: any): void {
    this.value = obj || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
}
