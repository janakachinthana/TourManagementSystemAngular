import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { Customer } from './customer.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  formData: Customer;
  list: Customer[];
  // readonly rootURL = 'https://localhost:44300/api';
  readonly rootURL = 'https://localhost:44392/api';
  constructor(private http: HttpClient) { }

  postCustomer(formData: Customer) {
   return this.http.post(this.rootURL + '/Customer', formData);
  }

  refreshList() {
    this.http.get(this.rootURL + '/Customer').toPromise().then(res => this.list = res as Customer[]);
  }

  putCustomer(formData: Customer) {
    return this.http.put(this.rootURL + '/Customer/' + formData.ID, formData);
   }

   deleteCustomer(id: number) {
     return this.http.delete(this.rootURL + '/Customer/' + id);
   }

}
