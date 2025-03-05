import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MessageErrorsService } from '@app/services/core/message-errors.service';

@Component({
  selector: 'error-field',
  imports: [CommonModule],
  styleUrl: './error-field.component.css',
  template: `
    <ng-container *ngIf="control && control.touched && control.invalid">
      <small class="p-error" *ngFor="let errorMsg of errorMessages">
        {{ errorMsg }}
      </small>
    </ng-container>
  `,
})
export class ErrorFieldComponent implements OnChanges {
  @Input() control!: AbstractControl;
  errorMessages: string[] = [];

  constructor(private error: MessageErrorsService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateErrorMessages();
  }
  private updateErrorMessages(): void {
    this.errorMessages = [];
    if (this.control && this.control.errors) {
      Object.keys(this.control.errors).forEach(errorKey => {
        let message = this.getMessageForError(errorKey, this.control.errors![errorKey]);
        this.errorMessages.push(message);
      });
    }
  }

  private getMessageForError(errorKey: string, errorValue: any): string {
    console.log('ERROR', errorKey);
    // Aquí se evalúa el tipo de error y se retorna el mensaje correspondiente
    switch (errorKey) {
      case 'required':
        return this.error.fieldRequired;
      case 'email':
        return this.error.fieldEmail;
      case 'minlength':
        return this.error.fieldMinLength(errorValue);
      case 'maxlength':
        return this.error.fieldMaxLength(errorValue);
      case 'min':
        return this.error.fieldMin(errorValue);
      case 'max':
        return this.error.fieldMax(errorValue);
      case 'pattern':
        return this.error.fieldPattern;
      // Puedes agregar más casos según tus validadores
      default:
        return 'Error de validación';
    }
  }
}
