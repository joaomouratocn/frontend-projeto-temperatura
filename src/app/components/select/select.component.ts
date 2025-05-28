import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UnitModelType } from '../../types/unit-model.type';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() labelName: string = '';
  @Input() labelText: string = '';
  @Input() itens: UnitModelType[] = [];
  @Input() pErrorText: string = '';
  @Input() showError: boolean = false;

  value: UnitModelType | null = null;

  onChange: (value: UnitModelType | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: UnitModelType | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelectChange(value: UnitModelType | null) {
    this.value = value;
    this.onChange(value);
  }

  compareObjects = (a: UnitModelType, b: UnitModelType): boolean => {
    return a && b ? a.uuid === b.uuid : a === b;
  };
}
