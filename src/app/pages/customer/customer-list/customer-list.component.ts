import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FileUpload } from 'primeng/fileupload';
import { Customer } from '@app/models/customers';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  imports: [ToolbarModule, ButtonModule, FileUpload, TableModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent {
  constructor(private router: Router) { }
  customer: Customer[] = [];
  newCustomer() { }
  exportCSV() { }
  editCustomer(customer: Customer) { }

  deleteCustomer(customer: Customer) { }
  deleteSelectedProducts() { }

  importListCustomers() {
    console.log('importing customers');
    this.router.navigate(['/customers/upload/multiple']);
  }
}
