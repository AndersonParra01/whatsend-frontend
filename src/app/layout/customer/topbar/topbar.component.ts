import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-topbar',
  imports: [AvatarModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  @Input() isDarkMode = false;

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleDarkMode = new EventEmitter<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  onToggleDarkMode() {
    this.toggleDarkMode.emit();
  }
}
