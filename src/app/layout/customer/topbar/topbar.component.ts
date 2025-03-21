import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SocketService } from '@app/services/socket.service';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-topbar',
  imports: [AvatarModule, InputTextModule, CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() sidebarCollapsed = false; // Recibe el estado del sidebar
  menuOpen: boolean = false;

  constructor(private socketService: SocketService) { }


  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    console.log('logout');
    this.socketService.emit('logout');

    this.socketService.listen('loggedOut').subscribe({
      next: (data) => {
        console.log('Logged out', data);
        this.menuOpen = false;

      },
      error: (error) => {
        console.error('Error logging out', error);
        this.menuOpen = false;

      },
    })
  }

}
