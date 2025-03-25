import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-button',
  imports: [ReactiveFormsModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() buttonText:String = ''
  @Output() onSubmit = new EventEmitter()

  submit(){
    this.onSubmit.emit();
  }
}
