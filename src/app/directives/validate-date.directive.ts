import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appValidateDate]',
  standalone: true,
})
export class ValidateDateDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, '');

    // Limita a 8 dígitos (ddMMyyyy)
    if (value.length > 8) value = value.substring(0, 8);

    // Formata com barras
    if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }

    input.value = value;

    // Validação quando completar a data
    if (value.length === 10) {
      const isValid = this.isValidDate(value);
      if (!isValid) {
        input.setCustomValidity('Data inválida');
      } else {
        input.setCustomValidity('');
      }
    } else {
      input.setCustomValidity('');
    }

    input.reportValidity(); // Atualiza a UI se estiver dentro de um form
  }

  @HostListener('keydown.backspace', ['$event'])
  onBackspace(event: KeyboardEvent): void {
    const input = this.el.nativeElement;
    const value = input.value;
    if (value.endsWith('/')) {
      input.value = value.slice(0, -1);
      event.preventDefault();
    }
  }

  private isValidDate(value: string): boolean {
    const [dayStr, monthStr, yearStr] = value.split('/');
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (!day || !month || !year) return false;

    const date = new Date(year, month - 1, day);

    const isRealDate =
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year;

    const now = new Date();
    const isFuture = date > now;

    return isRealDate && !isFuture;
  }
}
