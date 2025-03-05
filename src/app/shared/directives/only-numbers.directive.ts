import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {
  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue: string = event.target.value;
    // Reemplaza cualquier caracter que no sea un dígito
    event.target.value = initalValue.replace(/[^0-9]/g, '');
    if (initalValue !== event.target.value) {
      event.stopPropagation();
    }
  }

}
