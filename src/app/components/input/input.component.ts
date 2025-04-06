import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from '../../directives/only-number.directive';
import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [CommonModule, ReactiveFormsModule, OnlyNumberDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements ControlValueAccessor {
  @Input() labelName: string = '';
  @Input() labelText: string = '';
  @Input() inputType: string = 'text';
  @Input() inputPlaceHolder: string = '';
  @Input() pErrorText: string = '';
  @Input() showError: boolean = false;
  @Input() onlyNumbers: boolean = false;
  @Input() imageSrc?: string = '';
  @Input() imageAlt: string = '';
  @Input() reverseOrietation = false;
  @Input() passwordField: boolean = false;

  showPassword: boolean = false;

  value: String = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
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

  setDisabledState(isDisabled: boolean): void {}

  get CurrentInputType(): string {
    return this.inputType === 'password'
      ? this.showPassword
        ? 'text'
        : 'password'
      : this.inputType;
  }

  get toggleIcon(): string {
    return this.showPassword
      ? '/assets/visibility.png'
      : '/assets/visibility-off.png';
  }

  get shouldShowPassword(): boolean {
    return this.passwordField
      ? !!this.imageSrc && this.inputType === 'password'
      : !!this.imageSrc;
  }

  togglePasswordVisibily() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);
  }
}
