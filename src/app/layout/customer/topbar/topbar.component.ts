import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalstorageService } from '@app/services/core/localstorage.service';
import { ThemeService } from '@app/services/core/theme.service';
import { SocketService } from '@app/services/socket.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-topbar',
  imports: [AvatarModule, InputTextModule, CommonModule, ButtonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() sidebarCollapsed = false; // Recibe el estado del sidebar
  menuOpen: boolean = false;

  constructor(
    private socketService: SocketService,
    public theme: ThemeService,
    private storage: LocalstorageService
  ) { }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.menuOpen = false;
    console.log('logout');
    this.socketService.emit('logout');

    this.socketService.listen('loggedOut').subscribe({
      next: (data) => {
        console.log('Logged out', data);
        this.storage.clear();
        location.reload();

      },
      error: (error) => {
        console.error('Error logging out', error);
        this.menuOpen = false;
      },
    });
  }

  toggleTheme() {
    if (this.theme.currentTheme === 'dark') {
      // Pasa a 'light'
      this.theme.setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      // Pasa a 'dark'
      this.theme.setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }
}
