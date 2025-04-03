import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true,
})
export class OnlyNumberDirective {
  @Input() appOnlyNumbers: boolean = false;

  private regex: RegExp = new RegExp(/^[0-9.]*$/);
  private specialKeys: string[] = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
  ];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.includes(event.key)) {
      return;
    }

    const currentValue: string = this.el.nativeElement.value;
    const nextValue: string = currentValue.concat(event.key);

    if (!String(event.key).match(this.regex)) {
      event.preventDefault();
    }

    if (event.key === '.' && currentValue.includes('.')) {
      event.preventDefault();
    }
  }
}
