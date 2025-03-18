import { ApplicationRef, inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { BehaviorSubject, first, Observable } from 'rxjs';
import { ClientInfoWhatsApp } from '@app/models/user-whatsapp';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private userSubject = new BehaviorSubject<ClientInfoWhatsApp | null>(null);
  user$ = this.userSubject.asObservable();

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

  setUser(user: ClientInfoWhatsApp | null): void {
    this.userSubject.next(user);
  }

  onQrCode(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('qr-code', (data) => {
        observer.next(data);
      });
    });
  }

  onWhatsAppReady(): Observable<void> {
    return new Observable((observer) => {
      this.socket.on('ready', () => observer.next());
    });
  }


  connected(): boolean {
    return this.socket.connected;
  }

  /**
  * Escucha un evento específico del servidor y retorna un Observable con sus datos.
  * @param eventName Nombre del evento a escuchar
  */
  listen<T>(eventName: string): Observable<T> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: T) => {
        subscriber.next(data);
      });
    });
  }

  /**
   * Envía un evento al servidor
   * @param eventName Nombre del evento
   * @param data Datos a enviar (opcional)
   */
  emit(eventName: string, data?: any) {
    this.socket.emit(eventName, data);
  }

  /**
   * Envía mensaje de WhatsApp a un número dado
   * @param number Número de WhatsApp (puede ser local, el back lo formateará)
   * @param message Texto del mensaje
   */
  sendMessage(number: string, message: string) {
    this.socket.emit('send-message', { number, message });
  }

  sendBulkMessages(numbers: string[], message: string, delaySeconds: number) {
    this.socket.emit('bulk-send-message', { numbers, message, delaySeconds });
  }

  // Escuchar resultado del envío masivo desde servidor
  onBulkSendResult(): Observable<any[]> {
    return new Observable(observer => {
      this.socket.on('bulk-send-result', (data) => {
        observer.next(data);
      });

      // Manejar error si es necesario
      this.socket.on('error', (error) => {
        observer.error(error);
      });
    });
  }

  /**
   * Cierra la conexión manualmente (opcional)
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  /**
   * Vuelve a conectar manualmente (opcional)
   */
  connect() {
    if (this.socket && !this.socket.connected) {
      this.socket.connect();
    }
  }
}
