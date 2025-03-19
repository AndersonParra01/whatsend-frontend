import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SocketService } from '../../../services/socket.service';
import { ClientInfoWhatsApp } from '@app/models/user-whatsapp';
import { LocalstorageService } from '@app/services/core/localstorage.service';
@Component({
  selector: 'app-qr-scanner',
  imports: [CommonModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css',
})
export class QrScannerComponent implements OnInit, OnChanges {
  constructor(
    private socketService: SocketService,
    private cd: ChangeDetectorRef,
    private storage: LocalstorageService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    // this.qrCodeUrl = 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=http://example.com';
    // this.whatsappConnected = true;
    this.userConnected;
    // this.cd.detectChanges();
  }

  qrCodeUrl: string | null = null;
  whatsappConnected: boolean = false;
  userConnected: ClientInfoWhatsApp | null = null;
  ngOnInit(): void {
    const stateUserConnectedWhatsapp = this.storage.getItem('stateConnected');
    console.log('ESTADO WHATSAPP: ', stateUserConnectedWhatsapp);
    if (stateUserConnectedWhatsapp) {
      console.log('Verificando el estado del usuario del Whatsapp', stateUserConnectedWhatsapp);
      this.whatsappConnected = true;
    } else {
      this.whatsappConnected = false;
    }

    this.socketService.onQrCode().subscribe((qrUrl) => {
      console.log('listening qr-code from Backend');
      this.qrCodeUrl = qrUrl;
      this.cd.detectChanges();
    });

    this.socketService.user$.subscribe({
      next: (user) => {
        console.log('User info QR: ', user);
        if (user) {
          this.userConnected = user;
          this.cd.detectChanges();
        } else {
          console.log('User not connected');
        }
      },
      error: (error) => {
        this.whatsappConnected = false;
        console.error('Error getting user info', error);
      },
    })



    this.startTimer();
    this.simulateScanning();

  }

  sentToMessage(message: string) {
    console.log('Mensaje', message);
  }

  isAuthenticated = false;
  isScanning = false;
  timeLeft = 60;
  timerProgress = 100;
  timerInterval: any;

  userInfo = {
    name: "",
    phone: "",
    status: "Hey there! I am using WhatsApp",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
  };


  startTimer() {
    this.timeLeft = 60;
    this.timeLeft--;


    /*     this.timerInterval = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
          } else {
          }
        }, this.timeLeft = 0); */
  }



  refreshQRCode() {
    this.isAuthenticated = false;
    this.isScanning = false;
    this.startTimer();
    this.simulateScanning();
  }

  simulateScanning() {
    setTimeout(() => {
      this.isScanning = true;
      setTimeout(() => {
        this.isAuthenticated = true;
      }, 2000);
    }, 3000);
  }
}
