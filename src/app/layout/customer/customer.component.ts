import { Component } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

@Component({
  selector: 'app-customer',
  imports: [ContentComponent, SidebarComponent, TopbarComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  // Estado del sidebar y modo oscuro
  isSidebarOpen = true;
  isDarkMode = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }
}
