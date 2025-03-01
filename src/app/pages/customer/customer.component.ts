import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FileUpload } from 'primeng/fileupload';
import { SplitterModule } from 'primeng/splitter';
import { ChargerCustomersComponent } from './charger-customers/charger-customers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [
    ToolbarModule,
    ButtonModule,
    FileUpload,
    SplitterModule,
    ChargerCustomersComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  exportCSV() { }

  newCustomer() { }

  showLoadOptions = false;
  totalCustomers = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Simulate loading total customers
    this.totalCustomers = 150;
  }

  navigateToCustomerList(): void {
    // Implement navigation logic
    console.log('Navigating to customer list');
    this.router.navigate(['/customers/list']);
  }

  openLoadOptions(): void {
    this.showLoadOptions = true;
  }

  closeLoadOptions(): void {
    this.showLoadOptions = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      // Implement file processing logic
    }
  }

  uploadBulk(): void {
    // Implement bulk upload logic
    console.log('Uploading bulk data');
  }


  uploadCustomerMultiple() {
    // Implement multiple customer upload logic
    console.log('Uploading multiple customers');
    this.router.navigate(['/customers/upload/multiple']);
  }

  createCustomerOne() {
    // Implement single customer creation logic
    console.log('Creating a single customer');
    this.router.navigate(['/customers/create']);
  }

  backToCard() {
    this.showLoadOptions = false;
  }
}
