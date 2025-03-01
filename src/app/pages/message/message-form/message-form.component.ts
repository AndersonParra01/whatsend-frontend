import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { Fluid } from 'primeng/fluid';
import { TextareaModule } from 'primeng/textarea';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModule } from 'primeng/message';

import { Chip } from 'primeng/chip';
import { MessageService } from '@app/services/message.service';
@Component({
  selector: 'app-message-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    InputNumberModule,
    ButtonModule,
    Fluid,
    TextareaModule,
    MessageModule,
    Chip,

  ],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.css',
})
export class MessageFormComponent implements OnInit {
  messageForm!: FormGroup;
  isEdit: boolean = false;
  message: string = '';
  items: string[] = ['Noah', 'Liam', 'Mason', 'Jacob'];
  messageId!: number;
  // Configuración de Quill con el módulo mention

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageApi: MessageService,
    private route: ActivatedRoute
  ) {
    this.messageForm = this.fb.group({
      message: ['', Validators.required],
      intervale: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.messageId = +this.route.snapshot.paramMap.get('id')!;

    if (this.messageId) {
      this.isEdit = true;
      this.messageApi.getFindById(this.messageId).subscribe({
        next: (message) => {
          console.log('Message retrieved', message);
          this.messageForm.patchValue(message);
        },
        error: (error) => {
          console.error('Error retrieving message', error);
        },
      });
    } else {
      this.isEdit = false;

    }
  }

  onSubmit() {
    if (this.messageForm.valid) {
      this.createAndUpdateMessage();
    } else {
      this.messageForm.markAllAsTouched();
    }
  }

  createAndUpdateMessage() {
    if (this.isEdit === true) {
      console.log('update');
      const values = this.messageForm.value;
      this.messageApi.updateMessage(this.messageId, values).subscribe({
        next: (message) => {
          console.log('Message updated', message);
          this.router.navigate(['/messages']);
        },
        error: (error) => {
          console.error('Error updating message', error);
        },
      })
    } else {
      console.log('create');
      const values = this.messageForm.value;
      console.log(values);
      this.messageApi.createMessage(values).subscribe({
        next: (message) => {
          console.log('Message created', message);
          this.router.navigate(['/messages']);
        },
        error: (error) => {
          console.error('Error creating message', error);
        },
      });
    }
  }


  cancel() {
    this.router.navigate(['/messages']);
  }

  insertPlaceholder(value: string) {
    console.log('VALUE: ', value);
    /*     const current = this.messageForm.get('message')?.value || '';

        if (current.indexOf(value) !== -1) {
          console.log('Ya esta insertado no agregar mas');
          return;
        }
        // Agregas un espacio y el marcador al final del texto
        this.messageForm.get('message')?.setValue(`${current} ${value} `); */
  }
}
