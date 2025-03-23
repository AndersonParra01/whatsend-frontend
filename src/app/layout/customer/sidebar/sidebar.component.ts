import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-sidebar',
  imports: [MenuModule, AvatarModule, CommonModule, RouterModule, DrawerModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() collapsed: boolean = false;
  @Input() mobileVisible: boolean = false;
  @Output() mobileVisibleChange = new EventEmitter<boolean>();
  items: MenuItem[] | undefined;
  constructor(private router: Router) { }
  menuItems: MenuItem[] = [
    { label: 'Inicio', icon: 'pi pi-home', route: '/home' },
    { label: 'Panel', icon: 'pi pi-chart-pie', route: '/dashboard' },
    { label: 'Sucursales', icon: 'pi pi-building', route: '/branches' },
    { label: 'Mensajes', icon: 'pi pi-inbox', route: '/messages' },
    { label: 'Clientes', icon: 'pi pi-users', route: '/customers' },
    { label: 'Historial Envios', icon: 'pi pi-history', route: '/historical-messages' },
  ];
  ngOnInit() {

  }
}
