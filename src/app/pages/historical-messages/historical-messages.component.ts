import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '@app/models/messages';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
@Component({
  selector: 'app-historical-messages',
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    DatePickerModule
  ],
  templateUrl: './historical-messages.component.html',
  styleUrl: './historical-messages.component.css',
})
export class HistoricalMessagesComponent implements OnInit {
  messages: any[] = [
    {
      id: 1,
      contactName: 'John Doe',
      phoneNumber: '+1234567890',
      content:
        '¡Aprovecha nuestra promoción especial! 20% de descuento en todos nuestros productos hasta fin de mes.',
      created_at: new Date(),
      status: 'read',
      profilePic:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      promotion: true,
    },
    {
      id: 2,
      contactName: 'Jane Smith',
      phoneNumber: '+1987654321',
      content:
        '¡Aprovecha nuestra promoción especial! 20% de descuento en todos nuestros productos hasta fin de mes.',
      timestamp: new Date(Date.now() - 3600000),
      status: 'delivered',
      profilePic:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  showSearch = false;
  showDateFilter = false;
  searchText = '';
  searchType = 'all';
  startDate: string = '';
  endDate: string = '';

  get filteredMessages(): Message[] {
    return this.messages.filter((message) => {
      let matchesSearch = true;
      let matchesDate = true;

      // Search filter
      if (this.searchText) {
        const searchLower = this.searchText.toLowerCase();
        switch (this.searchType) {
          case 'name':
            matchesSearch = message.contactName
              .toLowerCase()
              .includes(searchLower);
            break;
          case 'phone':
            matchesSearch = message.phoneNumber.includes(this.searchText);
            break;
          case 'content':
            matchesSearch = message.content.toLowerCase().includes(searchLower);
            break;
          default:
            matchesSearch =
              message.contactName.toLowerCase().includes(searchLower) ||
              message.phoneNumber.includes(this.searchText) ||
              message.content.toLowerCase().includes(searchLower);
        }
      }

      // Date filter
      if (this.startDate && this.endDate) {
        const messageDate = new Date(message.timestamp);
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        end.setHours(23, 59, 59);
        matchesDate = messageDate >= start && messageDate <= end;
      }

      return matchesSearch && matchesDate;
    });
  }

  ngOnInit(): void { }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchText = '';
      this.searchType = 'all';
    }
  }

  toggleDateFilter(): void {
    this.showDateFilter = !this.showDateFilter;
    if (!this.showDateFilter) {
      this.startDate = '';
      this.endDate = '';
    }
  }

  onSwipeLeft(message: Message): void {
    console.log('Delete message:', message);
  }

  onSwipeRight(message: Message): void {
    console.log('Archive message:', message);
  }
}
