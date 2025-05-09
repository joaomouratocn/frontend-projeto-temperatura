import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-button',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() orangeButton: boolean = false;
  @Input() buttonText: String = '';
  @Output() onSubmit = new EventEmitter();
  @Input() imageSrc?: string;
  @Input() imageAlt: string = '';
  @Input() isLoading: boolean = false;
  @Input() disable: boolean = false;

  submit() {
    if (!this.isLoading) {
      this.onSubmit.emit();
    }
  }
}
