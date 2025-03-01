import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrScannerComponent } from '../home/qr-scanner/qr-scanner.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, QrScannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent { }
