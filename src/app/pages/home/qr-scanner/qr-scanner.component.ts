import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SocketService } from '../../../services/socket.service';
@Component({
  selector: 'app-qr-scanner',
  imports: [CommonModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css',
})
export class QrScannerComponent implements OnInit {
  constructor(
    private socketService: SocketService,
    private cd: ChangeDetectorRef
  ) { }

  qrCodeUrl: string | null = null;
  whatsappReady: boolean = false;
  whatsappConnected: boolean = false;
  ngOnInit(): void {
    this.socketService.onQrCode().subscribe((qrUrl) => {
      console.log('listening on qr-code from FrontEnd', qrUrl);
      this.qrCodeUrl = qrUrl;
      this.cd.detectChanges();
    });
    this.socketService.onWhatsAppReady().subscribe(() => {
      console.log('WhatsApp ready');
      this.whatsappReady = true;
      this.whatsappConnected = true;
      this.cd.detectChanges();
    });
  }

  sentToMessage(message: string) {
    console.log('Mensaje', message);
  }
}
