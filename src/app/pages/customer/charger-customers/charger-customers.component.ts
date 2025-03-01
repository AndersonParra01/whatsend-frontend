import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';

import { MenuItem } from 'primeng/api';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { PreviewComponent } from './preview/preview.component';
import { ValidateComponent } from './validate/validate.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@Component({
  selector: 'app-charger-customers',
  imports: [
    CommonModule,
    StepsModule,
    FileUploadComponent,
    PreviewComponent,
    ValidateComponent,
    ConfirmationComponent
  ],
  templateUrl: './charger-customers.component.html',
  styleUrl: './charger-customers.component.css',
})
export class ChargerCustomersComponent implements OnInit {
  items: MenuItem[] | undefined;
  steps: string[] = ['Select File', 'Preview', 'Validate', 'Confirm'];
  currentStep: number = 1;
  fileUploadComponent: boolean = true;
  previewComponent: boolean = false;
  validateComponent: boolean = false;
  confirmationComponent: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Seleccionar archivo',
        command: (event) => {
          console.log(event);
          this.fileUploadComponent = true;
          this.previewComponent = false;
          this.validateComponent = false;
          this.confirmationComponent = false;
        },
      },
      {
        label: 'Vista Previa',
        command: (event) => {
          console.log(event);
          this.previewComponent = true;
          this.fileUploadComponent = false;
          this.validateComponent = false;
          this.confirmationComponent = false;
        },
      },
      {
        label: 'Validar',
        command: (event) => {
          console.log(event);
          this.validateComponent = true;
          this.previewComponent = false;
          this.fileUploadComponent = false;
          this.confirmationComponent = false;
        },
      },
      {
        label: 'Confirmación',
        command: (event) => {
          console.log(event);
          this.confirmationComponent = true;
          this.validateComponent = false;
          this.previewComponent = false;
          this.fileUploadComponent = false;
        },
      },
    ];
  }

  nextStep(): void {
    /*     if (this.currentStep === 3) {
          this.validateData();
          if (this.canProceed) {
            this.successMessage = `Successfully uploaded ${this.previewData.length} customers`;
            this.currentStep++;
          }
        } else {
          this.currentStep++;
        } */
  }

  previousStep(): void {
    this.currentStep--;
  }
}
