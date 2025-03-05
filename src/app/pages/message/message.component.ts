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
import { ChipifyPipe } from '@app/shared/pipes/chip-fy-pipe.pipe';

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
    ChipifyPipe
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

  selectsMessage!: Message[] | null;
  messages: Message[] = [];
  cols!: Column[];

  ngOnInit(): void {
    this.messageServiceApi.getAllMessages().subscribe({
      next: (message) => {
        console.log('All messages', message);
        this.messages = message;
      },
      error: (error) => {
        console.error('Error getting messages', error);
      },
    });
  }

  newMessage() {
    this.router.navigate(['/messages/create']);
  }

  deleteSelectedProducts() { }

  exportCSV() {
    /*     this.dt.exportCSV();
     */
  }

  /*  getSeverity(status: string) {
     switch (status) {
       case 'INSTOCK':
         return 'success';
       case 'LOWSTOCK':
         return 'warning';
       case 'OUTOFSTOCK':
         return 'danger';
     }
   } */

  editMessage(message: Message) {
    console.log(message);
    this.router.navigate([`/messages/edit/${message.id}`,]);
  }

  deleteMessage(message: Message) {
    console.log(message);
  }
}
