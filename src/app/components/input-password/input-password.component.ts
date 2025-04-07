import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true,
    },
  ],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.css',
})
export class InputPasswordComponent implements ControlValueAccessor {
  @Input() showError: boolean = false;
  @Input() pErrorText: string = '';

  showPassword: boolean = false;

  value: string = '';
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
  setDisabledState?(isDisabled: boolean): void {}

  toggleType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  toggleIcon(): string {
    return this.showPassword
      ? '/assets/visibility.png'
      : '/assets/visibility-off.png';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);
  }
}
