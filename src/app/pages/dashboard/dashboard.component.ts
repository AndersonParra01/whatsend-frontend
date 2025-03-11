import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { Tag, TagModule } from 'primeng/tag';
import { MessageService } from '@app/services/message.service';
import { CustomerService } from '@app/services/customer.service';
import { BranchService } from '@app/services/branch.service';

interface DashboardStats {
  totalMessages: number;
  deliveredMessages: number;
  failedMessages: number;
  activeCustomers: number;
  activeBranches: number;
  messagesByDay: any;
  messagesByStatus: any;
  recentMessages: any[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ChartModule,
    TableModule,
    TagModule,
    Tag,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalMessages: 0,
    deliveredMessages: 0,
    failedMessages: 0,
    activeCustomers: 0,
    activeBranches: 0,
    messagesByDay: {},
    messagesByStatus: {},
    recentMessages: [],
  };

  messagesByDayData: any;
  messagesByStatusData: any;

  constructor(
    private messageService: MessageService,
    private customerService: CustomerService,
    private brancheService: BranchService,
  ) { }

  ngOnInit() {
    this.initializeChartData();
    this.initializeRecentMessages();
    this.getAllMessages();
    this.getAllCustomers();
    this.getAllBranches();
  }

  private initializeChartData() {
    // Datos de ejemplo para el gráfico de mensajes por día
    this.messagesByDayData = {
      labels: [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo',
      ],
      datasets: [
        {
          label: 'Mensajes Enviados',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4CAF50',
          tension: 0.4,
        },
      ],
    };

    // Datos de ejemplo para el gráfico de estados
    this.messagesByStatusData = {
      labels: ['Entregados', 'Fallidos', 'Pendientes'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#4CAF50', '#f44336', '#ff9800'],
        },
      ],
    };
  }

  getAllMessages() {
    this.messageService.getAllMessages().subscribe({
      next: (messages) => {
        console.log('All messages', messages);
        this.stats.totalMessages = messages.length;
        /*  this.stats.deliveredMessages = messages.filter((message) => message.status === 'delivered').length;
         this.stats.failedMessages = messages.filter((message) => message.status === 'failed').length; */
      },
      error: (error) => {
        console.error('Error getting messages', error);
      },
    })
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        console.log('All customers', customers);
        this.stats.activeCustomers = customers.length;
      },
      error: (error) => {
        console.error('Error getting customers', error);
      }
    })
  }

  getAllBranches() {
    this.brancheService.getAllBranches().subscribe({
      next: (branches) => {
        console.log('All branches', branches);
        this.stats.activeBranches = branches.length;
      },
      error: (error) => {
        console.error('Error getting branches', error);
      }
    })
  }
  private initializeRecentMessages() {
    this.stats.recentMessages = [
      {
        id: 1,
        customer: 'Juan Pérez',
        message: 'Promoción especial 20% descuento',
        status: 'delivered',
        timestamp: new Date(),
      },
      {
        id: 2,
        customer: 'María García',
        message: 'Recordatorio de cita',
        status: 'failed',
        timestamp: new Date(),
      },
      // Más mensajes de ejemplo...
    ];
  }

  getStatusSeverity(
    status: string
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warn'
    | 'danger'
    | 'contrast'
    | undefined {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'failed':
        return 'danger';
      default:
        return 'secondary'; // or any other valid value
    }
  }
}
