import { ApplicationRef, inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000', {
      autoConnect: false,
    });
    inject(ApplicationRef)
      .isStable.pipe(first((isStable) => isStable))
      .subscribe(() => {
        this.socket.connect();
        console.log('Socket connected');
      });
  }

  onQrCode(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('qr-code', (data) => {
        console.log('listening on qr-code from FrontEnd', data);
        observer.next(data);
      });
    });
  }

  onWhatsAppReady(): Observable<void> {
    return new Observable((observer) => {
      this.socket.on('ready', () => observer.next());
    });
  }

  sendMessage(message: string): void {
    this.socket.emit('send-message', message);
  }

  connected(): boolean {
    return this.socket.connected;
  }
}
