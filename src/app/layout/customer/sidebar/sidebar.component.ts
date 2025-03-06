import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [MenuModule, AvatarModule, CommonModule, Menu, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  items: MenuItem[] | undefined;
  constructor(private router: Router) { }
  ngOnInit() {
    this.items = [
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
    ];
  }
}
