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
import { BehaviorSubject } from 'rxjs';

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
  loggedIn$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    console.log('APP COMPONENT INIT');
    this.socketService.listen<any>('user-info').subscribe({
      next: (info) => {
        console.log('WhatsApp user info', info);
        this.whatsappInfo = info;
        this.loggedIn$.next(true);
        this.socketService.setUser(info);
      },
      error: (error) => {
        this.loggedIn$.next(false);
        console.error('Error getting WhatsApp user info', error);
      },
    });
  }
  title = 'EnvioMasivoWhatApps';
}
