import { Component, HostListener } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-customer',
  imports: [SidebarComponent, TopbarComponent, RouterOutlet, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {

  sidebarCollapsed: boolean = false;
  mobileSidebarVisible: boolean = false;
  constructor(private breakpointObserver: BreakpointObserver) { }
  @HostListener('window:resize')
  onResize() {
    // Si se redimensiona a ancho mayor o igual al md breakpoint, ocultamos el sidebar móvil
    if (window.innerWidth >= 768) {
      this.mobileSidebarVisible = false;
    }
  }

  toggleSidebar() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        // Móvil: cambiar overlay y colapso
        this.sidebarCollapsed = !this.sidebarCollapsed;
        this.mobileSidebarVisible = !this.mobileSidebarVisible;
      } else {
        // Escritorio: solo colapsar/expandir
        this.sidebarCollapsed = !this.sidebarCollapsed;
      }
    });
  }


}
