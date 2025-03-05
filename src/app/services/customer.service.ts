import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment as env } from '../../enviroments/enviroments';
import { Customer } from '@app/models/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = `${env.api}/customers`
  constructor(private http: HttpClient) { }

  getAllCustomers() {
    return this.http.get<Customer[]>(`${this.apiUrl}/all`);
  }

  getCustomerById(id: number) {
    return this.http.get<Customer>(`${this.apiUrl}/findBy/${id}`);
  }

  createCustomer(customer: Customer) {
    console.log('SERVICE CREATE', customer);
    return this.http.post<Customer>(`${this.apiUrl}/create`, customer);
  }

  updateCustomer(customer: Customer) {
    return this.http.put<Customer>(`${this.apiUrl}/update/${customer.id}`, customer);
  }
  deleteCustomer(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }


}
