import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfirmationService,
  MessageService as MessagePrimeNg,
} from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FileUpload } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';

import { Message } from '../../models/messages';
import { Column } from '../../models/column';
import { MessageService } from '@app/services/message.service';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-message',
  imports: [
    TableModule,
    SelectModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialog,
    InputTextModule,
    TextareaModule,
    CommonModule,
    FileUpload,
    DropdownModule,
    InputTextModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    TagModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    CardModule
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
  providers: [ConfirmationService, MessagePrimeNg],
})
export class MessageComponent {
  constructor(
    private messagePrimeNg: MessagePrimeNg,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageServiceApi: MessageService
  ) { }

  loading: boolean = false;
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;
  filters: any = {};
  selectedMessages: Message[] = [];
  currentPage = 1;
  totalPages = 1;
  searchQuery = '';

  messages: Message[] = [];
  cols!: Column[];

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.messageServiceApi
      .getMessages({
        page: this.currentPage,
        rows: this.rows,
        /* filters: { search: this.searchQuery }, */
      })
      .subscribe({
        next: (response) => {
          console.log('RESPONSE', response);
          this.messages = response.data;
          this.totalRecords = response.total;
          this.currentPage = response.page;
          this.totalPages = response.total;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar mensajes:', err);
        },
      });
  }

  // Métodos para cambiar de página
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMessages();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMessages();
    }
  }

  onSearchChange(): void {
    // Reiniciar a la primera página
    this.currentPage = 1;
    this.loadMessages();
  }

  newMessage() {
    this.router.navigate(['/messages/create']);
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar los mensaje seleccionados?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
      },
      acceptButtonProps: {
        label: 'Confirmar',
        icon: 'pi pi-check',
      },
      accept: () => {
        console.log('MEESAGE MASIVO', this.selectedMessages);

        const ids = this.selectedMessages?.map(message => message.id);
        console.log('IDS', ids);
        this.messageServiceApi.deleteMessageMany(ids).subscribe({
          next: () => {
            console.log('Messages deleted');
            this.selectedMessages = [];
            this.currentPage = 1;
            this.loadMessages();
          },
          error: (err) => {
            console.error('Error al eliminar mensaje:', err);
          },
        });
      },
    })
  }
  exportCSV() {

  }

  editMessage(message: Message) {
    console.log(message);
    this.router.navigate([`/messages/edit/${message.id}`]);
  }

  messageToSend(message: Message) {
    console.log('messageToSend');
    this.router.navigate([`/messages/send-message/${message.id}`]);
  }

  onDelete(message: Message) {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar este mensaje?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'danger',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirmar',
        icon: 'pi pi-check',
      },
      accept: () => {
        this.messageServiceApi.deleteMessage(message.id).subscribe({
          next: () => {
            console.log('Message deleted');
            this.currentPage = 1;
            this.loadMessages();
          },
          error: (err) => {
            console.error('Error al eliminar mensaje:', err);
          },
        });
      },
      reject: () => {
        this.messagePrimeNg.add({
          severity: 'info',
          summary: 'Confirmación cancelada',
          detail: 'La eliminación de este mensaje fue cancelada.',
        });
      },
    });
  }

  onSearch(event: any) {
    console.log('EVENT', event);
    this.filters = {
      ...this.filters,
      search: event.target.value,
    };
    this.loadMessages();
  }
}
