import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnlyNumberDirective } from '../../directives/only-number.directive';

@Component({
  selector: 'app-input-only-numbers',
  imports: [CommonModule, OnlyNumberDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputOnlyNumbersComponent),
      multi: true,
    },
  ],
  templateUrl: './input-only-numbers.component.html',
  styleUrl: './input-only-numbers.component.css',
})
export class InputOnlyNumbersComponent implements ControlValueAccessor {
  @Input() labelName: string = '';
  @Input() labelText: string = '';
  @Input() imgSrc: string = '';
  @Input() imgAlt: string = '';
  @Input() placeHolder: string = '';
  @Input() showError: boolean = false;
  @Input() pErrorText: string = '';

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
}
