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
        separator: true
      },
      {
        label: 'Envio Masivo',
        items: [
          {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: () => {
              this.router.navigate(['/home']);
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
          }
        ]
      },
      {
        separator: true
      }
    ];
  }
}
