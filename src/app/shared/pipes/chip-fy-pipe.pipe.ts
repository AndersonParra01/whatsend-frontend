import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'chipify',
  pure: false
})
export class ChipifyPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string): SafeHtml {
    if (!value) {
      return value;
    }
    let newValue = value.replace(/(@Nombre)/gi, `<span class="p-chipfy"><span class="p-chip-text">$1</span></span>`);
    newValue = newValue.replace(/(@Apellido)/gi, `<span class="p-chipfy"><span class="p-chip-text">$1</span></span>`);
    return this.sanitizer.bypassSecurityTrustHtml(newValue);
  }
}
