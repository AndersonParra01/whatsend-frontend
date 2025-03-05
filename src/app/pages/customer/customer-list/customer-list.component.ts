import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { Customer } from '@app/models/customers';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { CustomerService } from '@app/services/customer.service';
import { CommonModule } from '@angular/common';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-customer-list',
  imports: [
    ToolbarModule,
    ButtonModule,
    TableModule,
    CommonModule,
    CustomerFormComponent,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
  providers: [ConfirmationService, MessageService]

})
export class CustomerListComponent implements OnInit {
  customer: Customer[] = [];
  openModalCreateAndUpdateCustomer: boolean = false;
  selectedCustomer: Customer | null = null;
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.getCustomerAll();
  }

  getCustomerAll() {
    this.customerService.getAllCustomers().subscribe({
      next: (customer) => {
        console.log('All customers', customer);
        this.customer = customer;
      },
      error: (error) => {
        console.error('Error getting customers', error);
      },
    });
  }
  newCustomer() {
    console.log('create new customer');
    this.openModalCreateAndUpdateCustomer = true;
    this.selectedCustomer = null;
  }

  closeModal(state: boolean) {
    console.log('ESTADO', state);
    this.openModalCreateAndUpdateCustomer = state;
    this.getCustomerAll();
  }
  exportCSV() { }
  editCustomer(customer: Customer) {
    console.log('edit customer', customer);
    this.openModalCreateAndUpdateCustomer = true;
    this.selectedCustomer = customer;
  }

  deleteCustomer(customer: Customer) {
    console.log('Delete customer: ', customer);
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar este cliente?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customerService.deleteCustomer(customer.id).subscribe({
          next: () => {
            console.log('Customer deleted');
            this.messageService.add({
              severity: 'success',
              summary: 'Confirmación exitosa',
              detail: 'El cliente ha sido eliminado correctamente.'
            });
            this.getCustomerAll();
          },
          error: (error) => {
            console.error('Error deleting customer', error);
          },
        });
      },
      reject: () => {
        console.log('Customer rejected');
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmación cancelada',
          detail: 'La eliminación de este cliente fue cancelada.'
        })
      },
    })
  }
  deleteSelectedProducts() { }

  importListCustomers() {
    console.log('importing customers');
    this.router.navigate(['/customers/upload/multiple']);
  }
}
