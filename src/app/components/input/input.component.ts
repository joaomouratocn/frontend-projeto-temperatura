import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() pTextValue:String = ''
  @Input() inputType:String = 'text'
  @Input() inputPlaceHolder:String = ''
  inputValue:String = ''
}
