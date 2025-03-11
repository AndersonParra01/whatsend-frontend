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
    Tag
  ],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css',
})
export class BranchesComponent implements OnInit {
  branches: Branch_Office[] = [
    {
      id: 1,
      name: 'Downtown Branch',
      address: 'Central Business District',
      status: 'Activo',
      contact: '+1 (555) 123-4567',
      /*
            totalSms: 15420,
             */
    },
    {
      id: 2,
      name: 'Westside Location',
      address: 'West Shopping Center',
      status: 'Activo',
      contact: '+1 (555) 987-6543',
      /*
       totalSms: 8750,
       status: 'Activo' */
    },
    {
      id: 3,
      name: 'North Point',
      address: 'North Industrial Zone',
      status: 'Activo',
      contact: '+1 (555) 456-7890',
      /*  totalSms: 12300,
      status: 'InActivo' */
    },
  ];

  statusOptions = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' }
  ];


  searchTerm: string = '';
  showModal: boolean = false;
  modalTitle: string = '';
  modalMode: 'view' | 'edit' | 'add' = 'view';
  selectedBranch: any = null;

  constructor(private branchService: BranchService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllBranches();
  }

  get filteredBranches(): Branch_Office[] {
    return this.branches.filter(
      (branch) =>
        branch.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        branch.address.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }



  getAllBranches() {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        console.log('branches: ', branches);
        this.branches = branches;
        branches.forEach((branch) => this.getAllMessageById(branch.id));
      },
      error: (error) => {
        console.error('Error getting branches', error);
      }
    })
  }

  getAllMessageById(id: number) {
    this.messageService.getFindById(id).subscribe({
      next: (message) => {
        console.log('Message: ', message);
        // Aquí podrías actualizar la información de la sucursal con el mensaje obtenido
      },
      error: (error) => {
        console.error('Error getting message', error);
      }
    })
  }

  openAddBranchModal() {
    this.modalMode = 'add';
    this.modalTitle = 'Agregar nueva sucursal';
    // Inicializamos la sucursal con valores vacíos
    this.selectedBranch = {
      name: '',
      address: '',
      contact: '',
      status: 'activo' // Valor por defecto, si deseas
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
    if (!this.selectedBranch) return;

    // Buscar la sucursal en el arreglo original y actualizar
    const index = this.branches.findIndex(b => b.id === this.selectedBranch?.id);
    if (index !== -1) {
      this.branches[index] = { ...this.selectedBranch };
    }

    this.closeModal();
  }
}
