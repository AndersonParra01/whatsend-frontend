import { Component, HostListener } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  imports: [SidebarComponent, TopbarComponent, RouterOutlet, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {

  sidebarCollapsed: boolean = false;
  mobileSidebarVisible: boolean = false;
  @HostListener('window:resize')
  onResize() {
    // Si se redimensiona a ancho mayor o igual al md breakpoint, ocultamos el sidebar móvil
    if (window.innerWidth >= 768) {
      this.mobileSidebarVisible = false;
    }
  }

  toggleSidebar() {
    if (window.innerWidth < 768) {
      this.sidebarCollapsed = !this.sidebarCollapsed;

      // Modo móvil: alternar visibilidad del sidebar (overlay)
      this.mobileSidebarVisible = !this.mobileSidebarVisible;
    } else {
      // Modo escritorio/tablet: alternar colapsado/expandido
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }


}
