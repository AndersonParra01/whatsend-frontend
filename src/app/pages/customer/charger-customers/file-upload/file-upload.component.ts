import { Component, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  @ViewChild("fileInput") fileInput!: ElementRef;


  previewData: any[] = [];
  previewHeaders: string[] = [];
  validationErrors: string[] = [];
  successMessage: string = "";


  canProceed: boolean = false;

  fileUploadComponent: boolean = false;
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.handleFile(file);
  }

  handleFile(file: File): void {
    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv"
    ];

    if (!allowedTypes.includes(file.type)) {
      this.validationErrors = ["Invalid file format. Please upload an Excel or CSV file."];
      return;
    }

    this.selectedFile = file;
    this.readExcelFile(file);
    this.canProceed = true;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }


  readExcelFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      this.previewData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.previewHeaders = this.previewData[0];
      this.previewData = this.previewData.slice(1);
    };
    reader.readAsBinaryString(file);
  }





  validateData(): void {
    this.validationErrors = [];
    const requiredFields = ["nombre", "apellido", "telefono", "correo electronico", "direccion"];

    // Check headers
    const headers = this.previewHeaders.map(h => h.toLowerCase());
    const missingFields = requiredFields.filter(field => !headers.includes(field));

    if (missingFields.length > 0) {
      this.validationErrors.push(`Missing required columns: ${missingFields.join(", ")}`);
    }

    // Validate data
    this.previewData.forEach((row, index) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;

      const emailIndex = headers.indexOf("correo electronico");
      const phoneIndex = headers.indexOf("telefono");

      if (emailIndex !== -1 && !emailRegex.test(row[emailIndex])) {
        this.validationErrors.push(`Invalid email format in row ${index + 2}`);
      }

      if (phoneIndex !== -1 && !phoneRegex.test(row[phoneIndex])) {
        this.validationErrors.push(`Invalid phone number format in row ${index + 2}`);
      }
    });

    this.canProceed = this.validationErrors.length === 0;
  }

}
