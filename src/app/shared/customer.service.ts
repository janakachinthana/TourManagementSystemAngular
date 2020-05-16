import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { Customer } from './customer.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  formData: Customer;
  list: Customer[];
  table: number[];
  // readonly rootURL = 'https://localhost:44300/api';
<<<<<<< HEAD
  readonly rootURL = "https://localhost:44392/api";

=======
  // readonly rootURL = "https://localhost:44392/api"
  readonly rootURL = "http://localhost:62083/api"
>>>>>>> b705e94a3884c9914305dda14ced14e8094666a4
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

   GetSingleCustomer(id : number): Observable<any>{
    return this.http.get(this.rootURL+'/Customer/' + id)

  }

}
