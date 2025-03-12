import { Injectable } from '@angular/core';
import { Environment as env } from '../../enviroments/enviroments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Message } from '@app/models/messages';
import { Observable } from 'rxjs';
import { MessageResponse } from '@app/models/paginator';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = `${env.api}/messages`;
  constructor(private http: HttpClient) { }

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/all`);
  }

  getMessages(options: {
    page: number;
    rows: number;
    filters?: any;
  }): Observable<MessageResponse> {
    console.log('SERVICE PARAMS', options);
    let params = new HttpParams()
      .set('page', options.page.toString())
      .set('rows', options.rows.toString());

    if (options.filters?.search) {
      params = params.set('search', options.filters.search);
    }

    return this.http.get<MessageResponse>(`${this.apiUrl}/all/params`, { params });
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
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

  deleteMessageMany(ids: number[] | undefined): Observable<any> {
    const url = `${this.apiUrl}/deleteMany`;
    return this.http.post<any>(url, { ids });
  }


}
