import { Injectable } from '@angular/core';
import { Environment as env } from '../../enviroments/enviroments';
import { Delivery } from '@app/models/delivery';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = `${env.api}/deliveries`
  constructor(private http: HttpClient) { }

  getAllDeliveries() {
    return this.http.get<Delivery[]>(`${this.apiUrl}/all`);
  }

  getDeliveryById(id: number) {
    return this.http.get<Delivery>(`${this.apiUrl}/findBy/${id}`);
  }
  updateDelivery(delivery: Delivery) {
    return this.http.put(`${this.apiUrl}/update/${delivery.id}`, delivery);
  }

  createDelivery(delivery: Delivery) {
    return this.http.post(`${this.apiUrl}/create`, delivery);
  }

  deleteDelivery(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
