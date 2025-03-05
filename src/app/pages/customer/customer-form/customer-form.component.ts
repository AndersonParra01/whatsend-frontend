import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Branch_Office } from '@app/models/branch_office';
import { Status } from '@app/models/status';
import { CustomerService } from '@app/services/customer.service';
import { LabelDirective } from '@app/shared/directives/label.directive';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Fluid } from 'primeng/fluid';
import { BranchService } from '@app/services/branch.service';
import { SelectModule } from 'primeng/select';
import { ErrorFieldComponent } from '@app/shared/components/error-field/error-field.component';
import { OnlyNumbersDirective } from '@app/shared/directives/only-numbers.directive';
import { Customer } from '@app/models/customers';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-customer-form',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    CommonModule,
    LabelDirective,
    Fluid,
    SelectModule,
    ErrorFieldComponent,
    OnlyNumbersDirective,
    ToastModule
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
  providers: [MessageService]
})
export class CustomerFormComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() customer: Customer | null = null;
  customerForm!: FormGroup;
  customerId!: number;
  isEdit: boolean = false;
  titleModal: string = '';
  titleButton: string = '';
  branches: Branch_Office[] = [];
  status: any[] = [
    { value: 'Activo', label: 'Activo' },
    { value: 'Inactivo', label: 'Inactivo' },
  ];
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private brancheService: BranchService,
    private messageService: MessageService
  ) {
    this.customerForm = this.fb.group({
      id: [''],
      names: [''],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.email]],
      branch: ['', Validators.required],
      status: ['', Validators.required],
      createdAt: [''],
      updatedAt: [''],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
    if (this.customer) {
      const patchValueFinal = {
        ...this.customer,
        branch: this.customer.branch.id,
      };
      this.customerForm.patchValue(patchValueFinal);
      this.titleModal = 'Actualizar Cliente';
      this.titleButton = 'Actualizar';
      this.isEdit = true;

    } else {
      this.customerForm.reset();
      this.titleModal = 'Crear Cliente';
      this.titleButton = 'Crear';
      this.isEdit = false;
    }
  }
  ngOnInit(): void {
    this.getAllBranches();
  }

  closeModal() {
    console.log('closeModal', this.close.emit(false));
    this.close.emit(false);
  }

  getOneCustomer() {
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customer) => {
        console.log('Customer', customer);
        this.customerForm.patchValue(customer);
      },
      error: (error) => {
        console.error('Error getting customer', error);
      },
    });
  }

  getAllBranches() {
    this.brancheService.getAllBranches().subscribe({
      next: (branches) => {
        console.log('All branches', branches);
        this.branches = branches;
      },
      error: (error) => {
        console.error('Error getting branches', error);
      },
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.createAndUpdateCustomer();
    } else {
      this.customerForm.markAllAsTouched();
    }
  }

  createAndUpdateCustomer() {
    this.loading = true;
    if (this.isEdit) {

      const values = this.customerForm.value;

      console.log('Update customer');
      const valuesFinales = {
        ...values,
        updatedAt: new Date(),
      }
      console.log('FINAL: ', valuesFinales);
      this.customerService.updateCustomer(valuesFinales).subscribe({
        next: (customer) => {
          console.log('Customer updated', customer);
          this.closeModal();
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Cliente actualizado correctamente',
            detail: '',
          });
        },
        error: (error) => {
          console.error('Error updating customer', error);
        },
      });

    } else {
      console.log('Create customer');
      const values = this.customerForm.value;
      const newValues = {
        ...values,
        id: null,
        createdAt: new Date(),
      };
      console.log('FINAL: ', newValues);
      this.customerService.createCustomer(this.customerForm.value).subscribe({
        next: (customer) => {
          console.log('Customer created', customer);
          this.closeModal();
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Cliente creado correctamente',
            detail: '',
          });
        },
        error: (error) => {
          console.error('Error creating customer', error);
        },
      });
    }
  }

  get f() {
    return this.customerForm.controls;
  }
}
