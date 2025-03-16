import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Customer } from '@app/models/customers';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DataSend } from '@app/models/dataSend';
import { MessageService } from 'primeng/api';
import { SocketService } from '@app/services/socket.service';
import { TotalContactsSend } from '@app/models/totalContactsSend';
import { Tag } from 'primeng/tag';
import { ExportFilesService } from '@app/services/export-files.service';

@Component({
  selector: 'app-sending-modal',
  imports: [
    ProgressBarModule,
    TableModule,
    CommonModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    Tag
  ],
  providers: [MessageService],
  templateUrl: './sending-modal.component.html',
  styleUrl: './sending-modal.component.css',
})
export class SendingModalComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() data: DataSend | null = null;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  progress = 0;
  totalMessages = 0;
  deliveredCount = 0;
  pendingCount = 0;
  failedCount = 0;
  selectedContacts: Customer[] = [];
  isPaused = false;
  intervaleMessage: number = 0;
  contacts: Customer[] = [];
  value: number = 0;
  interval: any;
  totalContacts = 0; // número total de contactos
  sentCount = 0; // número de mensajes enviados (éxito o error)
  estimatedTotalTimeMs = 0;
  progressInterval: any;
  totalContactsSend: TotalContactsSend[] = [];

  constructor(
    private ngZone: NgZone,
    private messagePrimeNg: MessageService,
    private socketService: SocketService,
    private reportService: ExportFilesService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    if (changes['data'] && this.data?.contacts) {
      this.totalMessages = this.data?.contacts?.length;
      this.totalContactsSend
      this.value
    }
  }

  startSending(): void {
    console.log('start sending');
    const numbersOfContacts = this.data?.contacts?.map(contact => contact.phone) || []
    this.totalContacts = numbersOfContacts.length;
    this.sentCount = 0;
    this.value = 0;
    console.log('numbersByContacts: ', numbersOfContacts)

    const intervaleSeconds = this.data?.intervale;
    // Tiempo total estimado del envío (contactos * intervalo en segundos)
    this.estimatedTotalTimeMs = (this.totalContacts * intervaleSeconds!) * 1000;

    this.socketService.sendBulkMessages(numbersOfContacts, this.data?.message!, this.data?.intervale!)
    const updateFrequencyMs = 200; // actualización visual cada 200 ms (0.2 seg)
    const totalSteps = this.estimatedTotalTimeMs / updateFrequencyMs;
    const increment = 100 / totalSteps;
    // Inicia la barra de progreso visual estimada
    this.progressInterval = setInterval(() => {
      this.value += increment;
      if (this.value >= 99) { // evitar completar antes del resultado real
        this.value = 99;
        clearInterval(this.progressInterval);
      }
    }, updateFrequencyMs);

    // Escucha resultados del envío en tiempo real
    this.socketService.onBulkSendResult().subscribe({
      next: (result) => {
        console.log('JSON RESULT', result);
        this.sentCount = result.length; // suponiendo que result es el array de respuestas

        const dataTransformer: TotalContactsSend[] = result.map(contact => ({
          names: this.data?.contacts.find(c => c.phone === contact.number)?.names || '',
          phone: contact.number,
          branch: this.data?.branch.name || '',
          status: contact.status,
        }))
        console.log('data transformer: ', dataTransformer);
        this.totalContactsSend = dataTransformer

        // Aquí verificas si ya recibiste todas las respuestas
        if (this.sentCount >= this.totalContacts) {
          clearInterval(this.progressInterval);
          this.value = 100; // ajustas barra a 100% exactamente
          console.log('¡Envío completado totalmente!');
        } else {
          // Opcionalmente recalibras el progreso según respuestas recibidas
          this.value = (this.sentCount / this.totalContacts) * 100;
        }

        console.log(`Progreso real: ${this.sentCount}/${this.totalContacts}`);
      },
      error: (err) => {
        console.error('Error durante el envío:', err);
        clearInterval(this.progressInterval);
      }
    });
  }

  stopSending(): void { }

  pauseSending(): void {
    this.isPaused = !this.isPaused;
  }

  closeModal() {
    this.close.emit(false);
  }

  getSeverityByStatus(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'Ok':
        return 'success';
      case 'Failed':
        return 'danger';
      case 'Pending':
        return 'warn';
      default:
        return 'info';
    }
  }

  exporTotPdfContactsSend() {
    console.log('export pdf');
    const data = this.totalContactsSend
    console.log('DATA BLOB', data);
    this.reportService.exportToPdf(data).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const date = new Date();
        const month = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const fileName = `reporte-${date.getDate()}-${month[date.getMonth()]}-${date.getFullYear()}-hora_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.pdf`;
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);

      },
      error: (err) => console.error('Error al exportar PDF:', err)
    })

  }

  exportToCsvContacsSend() {
    console.log('export csv');
  }
}
