import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import {
  ConfirmationService,
  MessageService as MessagePrimeNg,
} from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { SocketService } from './services/socket.service';
import { ClientInfoWhatsApp } from './models/user-whatsapp';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, ConfirmDialog],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ConfirmationService, MessagePrimeNg],
})
export class AppComponent implements OnInit {
  constructor(private socketService: SocketService) { }
  whatsappInfo: ClientInfoWhatsApp | null = null;

  ngOnInit(): void {
    console.log('APP COMPONENT INIT');
    this.socketService.listen<any>('user-info').subscribe((info) => {
      console.log('WhatsApp user info', info);
      this.whatsappInfo = info;
    });
  }
  title = 'EnvioMasivoWhatApps';
}
