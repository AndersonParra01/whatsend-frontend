import { Component } from '@angular/core';

@Component({
  selector: 'app-preview',
  imports: [],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  selectedFile: File | null = null;
  previewData: any[] = [];
  previewHeaders: string[] = [];
  validationErrors: string[] = [];
  canProceed = false;
  fileInput: any;
  constructor() { }
  removeFile(): void {
    this.selectedFile = null;
    this.previewData = [];
    this.previewHeaders = [];
    this.validationErrors = [];
    this.canProceed = false;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = "";
    }
  }
}
