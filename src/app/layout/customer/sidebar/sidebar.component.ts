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
    { label: 'Dashboard', icon: 'pi pi-chart-pie', route: '/dashboard' },
    { label: 'Sucursales', icon: 'pi pi-building', route: '/branches' },
    { label: 'Mensajes', icon: 'pi pi-inbox', route: '/messages' },
    { label: 'Clientes', icon: 'pi pi-users', route: '/customers' },
    { label: 'Historial Envios', icon: 'pi pi-history', route: '/historical-messages' },
  ];
  ngOnInit() {
    /*     this.items = [
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-sign-out',
            command: () => {
              // Call logout API
            }
          },
          {
            separator: true
          },
          {
            items: [
              {
                label: 'Dashboard',
                icon: 'pi pi-chart-pie',
                command: () => {
                  this.router.navigate(['/dashboard']);
                }
              },
              {
                label: 'Inicio',
                icon: 'pi pi-home',
                command: () => {
                  this.router.navigate(['/home']);
                }
              },
              {
                label: 'Sucursales',
                icon: 'pi pi-building',
                command: () => {
                  this.router.navigate(['/branches']);
                }
              },
              {
                label: 'Mensajes',
                icon: 'pi pi-inbox',
                command: () => {
                  this.router.navigate(['/messages']);
                }
              },
              {
                label: 'Clientes',
                icon: 'pi pi-users',
                command: () => {
                  this.router.navigate(['/customers']);
                }
              },
              {
                label: 'Historial Envios',
                icon: 'pi pi-history',
                command: () => {
                  this.router.navigate(['/historical-messages']);
                }
              }
            ]
          },
          {
            separator: true
          }
        ]; */
  }
}
