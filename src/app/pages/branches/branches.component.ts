import { ConfirmationService, MessageService as MessagePrimeNg } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Branch_Office } from '@app/models/branch_office';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { BranchService } from '@app/services/branch.service';
import { Tag } from 'primeng/tag';
import { MessageService } from '@app/services/message.service';
import { CustomerService } from '@app/services/customer.service';
import { ToastModule } from 'primeng/toast';
import { Customer } from '@app/models/customers';
import { Message } from '@app/models/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  selector: 'app-branches',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    CardModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    Tag,
    ToastModule,
    ConfirmDialogModule,
    SkeletonModule
  ],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css',
  providers: [MessagePrimeNg, ConfirmationService]
})
export class BranchesComponent implements OnInit {
  branches: Branch_Office[] = [];

  statusOptions = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' },
  ];

  searchTerm: string = '';
  showModal: boolean = false;
  modalTitle: string = '';
  modalMode: 'view' | 'edit' | 'add' = 'view';
  selectedBranch: Branch_Office | null = null;
  loading: boolean = false;
  skeletonArray: number[] = [];

  customerForBranches: Customer[] = [];
  messagesForBranches: Message[] = [];

  constructor(
    private branchService: BranchService,
    private messageService: MessageService,
    private customerService: CustomerService,
    private messagePrimeNg: MessagePrimeNg,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getAllBranches();
  }

  get filteredBranches(): Branch_Office[] {
    return this.branches.filter(
      (branch) =>
      (branch.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        branch.address?.toLowerCase().includes(this.searchTerm.toLowerCase())
      ));
  }

  getAllBranches() {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        console.log('branches sin ordenar: ', branches);
        this.skeletonArray = branches.length > 0 ? Array(branches.length).fill(0) : [1];
        // Ordenar primero por `updatedAt` (desc), si existe,
        // y luego por `createdAt` (desc).
        this.branches = branches.sort((a, b) => {
          const updatedA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const updatedB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;

          // Si ambos tienen updatedAt, ordena por updatedAt desc
          if (updatedA !== 0 && updatedB !== 0) {
            return updatedB - updatedA;
          }

          // Si solo uno tiene updatedAt, va primero el que lo tenga
          if (updatedA !== 0 && updatedB === 0) {
            return -1;
          }
          if (updatedA === 0 && updatedB !== 0) {
            return 1;
          }

          // Si ninguno tiene updatedAt, entonces ordena por createdAt desc
          const createdA = new Date(a.createdAt).getTime();
          const createdB = new Date(b.createdAt).getTime();
          return createdB - createdA;
        });

        console.log('branches ordenadas: ', this.branches);
        branches.forEach((branch) => this.getAllCustomerByBranch(branch.id!));
      },
      error: (error) => {
        console.error('Error getting branches', error);
      },
    });
  }

  getAllMessageById(id: number) {
    this.messageService.getFindById(id).subscribe({
      next: (message) => {
        console.log('Message: ', message);
        // Aquí podrías actualizar la información de la sucursal con el mensaje obtenido
      },
      error: (error) => {
        console.error('Error getting message', error);
      },
    });
  }

  getAllCustomerByBranch(branchId: number) {
    this.customerService.getCustomerByBranch(branchId).subscribe({
      next: (customers) => {
        console.log('Customers by branch : ', customers);
        this.customerForBranches = customers;
      },
      error: (error) => {
        console.error('Error getting customers', error);
      },
    });
  }

  counterCustomersByBranch(branchId: number | undefined): number {
    console.log('BRANCH: ', branchId);
    let count = 0;
    this.customerForBranches.forEach(customer => {
      if (customer.branch.id === branchId) {
        count++;
      }
    });
    return count;
  }

  counterMessagesByBranch(branchId: number | undefined): number {
    let count = 0;
    this.messagesForBranches.forEach(message => {
      if (message.branch?.id === branchId) {
        count++;
      }
    });
    return count;
  }

  openAddBranchModal() {
    this.modalMode = 'add';
    this.modalTitle = 'Agregar nueva sucursal';
    // Inicializamos la sucursal con valores vacíos
    this.selectedBranch = {
      name: '',
      address: '',
      contact: '',
      status: 'Activo',
      createdAt: new Date(),
    };
    this.showModal = true;
  }

  viewBranchDetails(branch: Branch_Office): void {
    this.modalMode = 'view';
    this.modalTitle = 'Detalles de la sucursal';
    this.selectedBranch = branch;
    this.showModal = true;
  }

  editBranch(branch: Branch_Office): void {
    console.log('BRANCH ', branch);
    this.modalMode = 'edit';
    this.modalTitle = 'Editar sucursal';
    this.selectedBranch = { ...branch };

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedBranch = null;
  }

  saveBranch() {
    this.loading = true;
    if (this.modalMode === 'add') {
      console.log('CREATE');
      console.log('select branch', this.selectedBranch);
      this.branchService.createBranch(this.selectedBranch).subscribe({
        next: (newBranch) => {
          console.log('Branch created: ', newBranch);
          this.getAllBranches();
          this.messagePrimeNg.add({
            severity: 'success',
            summary: 'Sucursal creada exitosamente',
            detail: 'La sucursal ha sido creada correctamente.',
          })
          this.closeModal();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error creating branch', error);
        },
      });
    } else {
      console.log('UPDATE');
      console.log('selected branch', this.selectedBranch);
      this.branchService.updateBranch(this.selectedBranch).subscribe({
        next: (updatedBranch) => {
          console.log('Branch updated: ', updatedBranch);
          this.getAllBranches();
          this.messagePrimeNg.add({
            severity: 'success',
            summary: 'Sucursal actualizada exitosamente',
            detail: 'La sucursal ha sido actualizada correctamente.',
          })
          this.closeModal();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error updating branch', error);
        },
      });
    }
  }

  deleteBranchById(branch: Branch_Office) {
    console.log('branch delete', branch);
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la sucursal "${branch.name}"?`,
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.branchService.deleteBranch(branch.id!).subscribe({
          next: () => {
            console.log('Branch deleted: ', branch.id);
            this.getAllBranches();
            this.messagePrimeNg.add({
              severity: 'success',
              summary: 'Sucursal eliminada exitosamente',
              detail: 'La sucursal ha sido eliminada correctamente.',
            })
            this.loading = false;
          },
          error: (error) => {
            console.error('Error deleting branch', error);
          },
        });
      },
      reject: () => {
        this.messagePrimeNg.add({
          severity: 'info',
          summary: 'Eliminación cancelada',
          detail: 'La operación de eliminación de la sucursal ha sido cancelada.',
        })
      },
    })
  }
}
