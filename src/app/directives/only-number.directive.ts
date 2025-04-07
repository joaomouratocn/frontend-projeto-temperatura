import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true,
})
export class OnlyNumberDirective {
  private regex: RegExp = new RegExp(/^[0-9.-]*$/);
  private specialKeys: string[] = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
  ];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.includes(event.key)) {
      return;
    }

    const input = this.el.nativeElement;
    const currentValue: string = this.el.nativeElement.value;

    if (
      currentValue.length >= 6 &&
      !input.selectionStart !== input.selectionEnd
    ) {
      event.preventDefault();
      return;
    }

    if (
      event.key === '-' &&
      (currentValue.length > 0 || currentValue.includes('-'))
    ) {
      event.preventDefault();
    }

    if (!String(event.key).match(this.regex)) {
      event.preventDefault();
    }

    if (event.key === '.' && currentValue.includes('.')) {
      event.preventDefault();
    }
  }
}
