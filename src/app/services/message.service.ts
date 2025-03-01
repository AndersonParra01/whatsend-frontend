import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Message } from '@app/models/messages';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = `${environment.api}/messages`;
  constructor(private http: HttpClient) { }

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/all`);
  }


  getFindById(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/findBy/${id}`);
  }

  createMessage(message: Message) {
    return this.http.post(`${this.apiUrl}/create`, message);
  }

  updateMessage(id: number, message: Message) {
    return this.http.put(`${this.apiUrl}/update/${id}`, message);
  }

  deleteMessage(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }


}
