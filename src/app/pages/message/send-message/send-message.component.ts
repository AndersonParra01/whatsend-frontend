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
import { CheckboxModule } from 'primeng/checkbox';
import { LocalstorageService } from '@app/services/core/localstorage.service';
import { SendingModalComponent } from '../sending-modal/sending-modal.component';
import { DataSend } from '@app/models/dataSend';

@Component({
  selector: 'app-send-message',
  imports: [
    CommonModule,
    FormsModule,
    EditorModule,
    ButtonModule,
    SelectModule,
    CardModule,
    ProgressBarModule,
    CheckboxModule,
    SendingModalComponent
  ],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css',
})
export class SendMessageComponent implements OnInit {
  messageId!: number;
  selectedMessage: string = '';
  selectedList = 'Marketing List #1';
  messageLength = 0;
  retryOption = 'none';
  isScheduled = false;
  scheduledTime = '';
  estimatedDuration = 0;
  branches: Branch_Office[] = [];
  selectedBranch: Branch_Office | null = null;
  idBranchSelected: number | null = null;
  customers: Customer[] = [];
  mensajeSeleccionado: number = 0;
  intervaleMessage: number = 0;
  selectedContacts: Customer[] = [];
  selectAll: boolean = false;
  data: DataSend | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private branchService: BranchService,
    private customerService: CustomerService,
    private localStorage: LocalstorageService
  ) { }
  ngOnInit() {
    this.messageId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.idBranchSelected = this.localStorage.getItem('branchId');
    if (this.idBranchSelected) {
      /*   this.loadBranchesById(this.idBranchSelected!);
        this.getContactsByBranch(this.idBranchSelected!); */
    }
    console.log('idBranch', this.idBranchSelected);
    this.getMessageById();
    this.loadBranchesAll();
  }

  get canSend(): boolean {
    return (
      this.selectedContacts.length > 0 &&
      this.selectedMessage.trim().length > 0
    );
  }

  getEstimatedCompletion(): string {
    // 1) Validaciones básicas
    if (!this.selectedContacts || this.selectedContacts.length === 0) {
      return 'No hay contactos seleccionados';
    }

    if (!this.intervaleMessage) {
      return 'No se ha definido el intervalo de envío';
    }

    // 2) Convertir a número y verificar que sea válido (positivo)
    const intervalInSeconds = parseFloat(this.intervaleMessage.toString());
    if (isNaN(intervalInSeconds) || intervalInSeconds <= 0) {
      return 'Intervalo de envío inválido';
    }

    // 3) Calcular el total de segundos = (# contactos) x (segundos por mensaje)
    const totalContacts = this.selectedContacts.length;
    const totalSeconds = totalContacts * intervalInSeconds;

    // 4) Formatear el tiempo total a h/min/seg
    const tiempoFormateado = this.formatTime(totalSeconds);

    // 5) Retornar un texto más directo
    return `Se tardará aproximadamente ${tiempoFormateado} en enviar ${totalContacts} mensaje(s).`;
  }


  private formatTime(seconds: number): string {
    // Redondeamos a entero por si se reciben decimales
    let resto = Math.floor(seconds);

    const horas = Math.floor(resto / 3600);
    resto = resto % 3600;

    const minutos = Math.floor(resto / 60);
    const segs = resto % 60;

    // Construimos un string dependiendo de cuáles sean mayores a 0
    // Ej: "2 h 5 min 10 s", "45 s", "10 min 5 s", etc.
    let resultado = '';
    if (horas > 0) {
      resultado += `${horas} h `;
    }
    if (minutos > 0) {
      resultado += `${minutos} min `;
    }
    if (segs > 0 || (horas === 0 && minutos === 0)) {
      // Si no hay horas ni minutos, mostramos los segundos
      resultado += `${segs} s`;
    }

    return resultado.trim();
  }

  validateSettings(): void {
    console.log('Validating settings...');
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

  loadBranchesById(idBranch: number) {
    this.branchService.getBranchById(idBranch).subscribe({
      next: (branches) => {
        console.log('Branche By Id: ', branches);
        this.selectedBranch = branches;
      },
      error: (error) => {
        console.error('Error getting branches', error);
      },
    });
  }

  enviarMensaje(): void { }

  backToMessageList() {
    this.router.navigate(['/messages']);
  }

  getBranch(event: any) {
    if (event.value) {
      console.log('CHANGE', event);
      console.log('CHANGE', event.value.id);
      this.localStorage.setItem('branchId', (event.value.id));
      this.getContactsByBranch(event.value.id);
    } else {
      console.log('No hay sucursal seleccionada');
      this.localStorage.removeItem('branchId');
      // O cualquier lógica que requieras cuando el usuario limpia la selección
    }
  }

  getContactsByBranch(branchId: number) {
    this.customerService.getCustomerByBranch(branchId).subscribe({
      next: (customers) => {
        console.log('Customers by branch', customers);
        this.customers = customers;
      },
      error: (error) => {
        console.error('Error getting customers by branch', error);
      },
    })
  }

  onSelectAllChange(event: any) {
    if (event.checked) {
      // Marcar todos los contactos
      this.selectedContacts = [...this.customers];
      console.log('Todos los contactos seleccionados', this.selectedContacts);
    } else {
      // Deseleccionar todos los contactos
      this.selectedContacts = [];
    }
  }

  startSending() {
    console.log('Iniciando envío...');

    this.isScheduled = true;
    this.data = {
      message: this.selectedMessage,
      intervale: this.intervaleMessage,
      branch: this.selectedBranch!,
      contacts: this.selectedContacts,
    }
  }
}
