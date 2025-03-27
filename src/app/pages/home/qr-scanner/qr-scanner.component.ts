import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabsModule } from 'primeng/tabs';
import { SocketService } from '../../../services/socket.service';
import { ClientInfoWhatsApp } from '@app/models/user-whatsapp';
import { LocalstorageService } from '@app/services/core/localstorage.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-qr-scanner',
  imports: [
    CommonModule,
    ButtonModule,
    ProgressSpinnerModule,
    TabsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    SelectModule,
  ],
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css',
})
export class QrScannerComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private socketService: SocketService,
    private cd: ChangeDetectorRef,
    private storage: LocalstorageService
  ) { }
  countries = [
    { name: 'Ecuador', code: '+593' },
    { name: 'Colombia', code: '+57' },
    { name: 'Perú', code: '+51' },
    { name: 'México', code: '+52' },
    // Agrega más países según necesites
  ];
  selectedCountry: string = '';

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  phoneNumber: string = '';
  pairingCode: string = '';
  statusMessage: string = '';
  pairingPhone: string = '';
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    this.userConnected;
    // this.cd.detectChanges();
  }

  qrCodeUrl: string | null = null;
  whatsappConnected: boolean = false;
  userConnected: ClientInfoWhatsApp | null = null;
  value: number = 0;

  // Array para almacenar los dígitos del código
  codeDigits: string[] = ['', '', '', '', '', ''];

  onEditPhone() {
    // Aquí podrías navegar de vuelta a la pantalla anterior
    // o habilitar un formulario para editar el teléfono.
    console.log('Editar número de teléfono');
  }

  onInputChange(index: number, event: any) {
    // Mover el foco automáticamente al siguiente input si se ingresó un dígito
    const value = event.target.value;
    if (value && index < this.codeDigits.length - 1) {
      const nextInput = event.target.parentElement.nextElementSibling?.querySelector('input');
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onConfirmCode() {
    const code = this.codeDigits.join('');
    console.log('Código ingresado:', code);
    // Aquí validas el código o lo envías a tu backend
    // ...
  }

  onSwitchToQR() {
    // Cambiar la vista a la pantalla de QR
    console.log('Cambiar a la pantalla de inicio de sesión con QR');
  }

  ngOnInit(): void {
    /*    this.socketService.onCodeGenerated().subscribe({
         next: (code) => {
           console.log('Code generated from Backend: ', code);
           this.pairingCode = code;
           this.cd.detectChanges();
         },
         error: (error) => {
           console.error('Error generating code', error);
         },
       }) */
    const stateUserConnectedWhatsapp = this.storage.getItem('stateConnected');
    console.log('ESTADO WHATSAPP: ', stateUserConnectedWhatsapp);
    if (stateUserConnectedWhatsapp) {
      console.log(
        'Verificando el estado del usuario del Whatsapp',
        stateUserConnectedWhatsapp
      );
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
    });

    this.startTimer();
    this.simulateScanning();
  }

  /*   generatePairingCode() {
      if (!this.phoneNumber.trim()) {
        this.statusMessage = 'Ingresa un número válido.';
        return;
      }

      this.statusMessage = 'Generando código...';
      this.socketService.emit('init-whatsapp', { method: 'pairing', number: this.phoneNumber });
    } */

  sentToMessage(message: string) {
    console.log('Mensaje', message);
  }

  isAuthenticated = false;
  isScanning = false;
  timeLeft = 60;
  timerProgress = 100;
  timerInterval: any;

  userInfo = {
    name: '',
    phone: '',
    status: 'Hey there! I am using WhatsApp',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
  };

  startTimer() {
    this.timeLeft = 60;
    this.timeLeft--;
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


  onLoginWithPhone() {
    // Aquí iría tu lógica para “loguear” con número de teléfono,
    // o llamar a un servicio que maneje la autenticación con WhatsApp
    // Ejemplo:
    if (!this.selectedCountry || !this.phoneNumber) {
      alert('Selecciona un país e ingresa tu número');
      return;
    }

    const fullNumber = this.selectedCountry + this.phoneNumber;
    console.log('Iniciando login con:', fullNumber);

    // ... Llamar a tu servicio de autenticación
    // this.whatsappService.loginWithPhone(fullNumber).subscribe(...)
  }


  generatePairingCode() {
    // Aquí generas el código de emparejamiento para el número
    if (!this.pairingPhone) {
      alert('Ingresa tu número para generar el código');
      return;
    }

    // Llamas a tu servicio que retorna un código
    // Ejemplo “fake”:
    this.pairingCode = 'ABC123'; // Podrías usar un random o uno que venga del backend
    console.log('Generando pairing code para:', this.pairingPhone);
  }

}
