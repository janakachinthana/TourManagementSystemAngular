import { Injectable } from '@angular/core';
import { Employee } from "./employee.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  formData : Employee;
  list : Employee[];

  readonly rootURL = "https://localhost:44398/api"
  constructor(private http : HttpClient) { }

  postEmployeee(formData : Employee){
   return this.http.post(this.rootURL+'/Employee',formData)
  }

  refreshList(){
    this.http.get(this.rootURL+'/Employee')
    .toPromise().then(res => this.list = res as Employee[])
  }

  putEmployeee(formData : Employee){
    return this.http.put(this.rootURL+'/Employee/'+formData.EmployeeID,formData)
   }

   deleteEmployee(id : number){
     return this.http.delete(this.rootURL+'/Employee/'+id);
   }
}
