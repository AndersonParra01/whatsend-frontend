import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch_Office } from '@app/models/branch_office';
import { Customer } from '@app/models/customers';
import { BranchService } from '@app/services/branch.service';
import { CustomerService } from '@app/services/customer.service';
import { MessageService } from '@app/services/message.service';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';


@Component({
  selector: 'app-send-message',
  imports: [
    CommonModule,
    FormsModule,
    EditorModule,
    ButtonModule,
    SelectModule,
    CardModule,
    ProgressBarModule

  ],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css',
})
export class SendMessageComponent implements OnInit {
  messageId!: number;
  selectedContacts: string[] = [];
  selectedMessage: string = '';
  selectedList = 'Marketing List #1';
  messageLength = 0;
  retryOption = 'none';
  isScheduled = false;
  scheduledTime = '';
  estimatedDuration = 0;
  isProcessing = false;
  isPaused = false;
  progress = 0;
  sentCount = 0;
  deliveredCount = 0;
  pendingCount = 0;
  failedCount = 0;
  totalMessages = 0;
  branches: Branch_Office[] = [];
  selectBranch: string = '';

  contactosDisponibles = [
    { nombre: 'Juan Pérez', seleccionado: false },
    { nombre: 'María Gómez', seleccionado: false },
    {
      nombre: 'Carlos Ruiz',
      seleccionado: false,
    },
  ];
  customers: Customer[] = [];
  sucursalSeleccionada = null;

  mensajeSeleccionado: number = 0;

  fechaProgramada = null;
  intervaleMessage: number = 0;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private branchService: BranchService,
    private customerService: CustomerService
  ) { }
  ngOnInit() {
    this.messageId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.loadInitialData();
    this.getMessageById();
    this.loadCustomersAll();
    this.loadBranchesAll();
  }

  loadInitialData() {
    this.selectedContacts = Array(100)
      .fill(0)
      .map((_, i) => `+1555000${i.toString().padStart(4, '0')}`);
    this.messageLength = this.selectedMessage.length;
  }



  get canSend(): boolean {
    return (
      this.selectedContacts.length > 0 &&
      this.selectedMessage.trim().length > 0 &&
      !this.isProcessing
    );
  }

  getEstimatedCompletion(): string {
    if (this.isScheduled && this.scheduledTime) {
      return `Scheduled for ${new Date(this.scheduledTime).toLocaleString()}`;
    }
    return `${this.estimatedDuration} minutes`;
  }

  validateSettings(): void {
    console.log('Validating settings...');
  }

  startSending(): void {
    this.isProcessing = true;
    this.totalMessages = this.selectedContacts.length;
    this.progress = 0;
    this.sentCount = 0;
    this.deliveredCount = 0;
    this.failedCount = 0;
    this.pendingCount = this.totalMessages;

    const sendInterval = setInterval(() => {
      if (this.isPaused) return;

      this.sentCount++;
      this.pendingCount--;
      this.progress = (this.sentCount / this.totalMessages) * 100;

      if (Math.random() > 0.1) {
        this.deliveredCount++;
      } else {
        this.failedCount++;
      }

      if (this.sentCount >= this.totalMessages) {
        clearInterval(sendInterval);
        this.isProcessing = false;
      }
    }, (60 / this.intervaleMessage) * 1000);
  }

  pauseSending(): void {
    this.isPaused = !this.isPaused;
  }

  stopSending(): void {
    this.isProcessing = false;
  }

  getMessageById() {
    this.messageService.getFindById(this.messageId).subscribe({
      next: (message) => {
        console.log('Message retrieved', message);
        this.selectedMessage = message.message.replace(/\n/g, '<br>');
        this.intervaleMessage = message.intervale;
      },
      error: (error) => {
        console.error('Error retrieving message', error);
      },
    });
  }

  loadCustomersAll() {
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        console.log('All customers', customers);
        this.customers = customers;
        /* this.branches = customers.map((c) => ({
          id: c.id,
          name: c.names,
        })); */
      },
      error: (error) => {
        console.error('Error getting customers', error);
      },
    });
  }

  loadBranchesAll() {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        console.log('All branches', branches);
        this.branches = branches;
      },
      error: (error) => {
        console.error('Error getting branches', error);
      },
    });
  }

  puedeEnviar(): boolean | null {
    return (
      this.sucursalSeleccionada &&
      this.mensajeSeleccionado &&
      this.contactosDisponibles.some((c) => c.seleccionado)
    );
  }

  enviarMensaje(): void {
    const contactosSeleccionados = this.contactosDisponibles.filter(
      (c) => c.seleccionado
    );
    alert(`Mensaje enviado a ${contactosSeleccionados.length} contactos.`);
  }

  backToMessageList() {
    this.router.navigate(['/messages']);
  }
}
