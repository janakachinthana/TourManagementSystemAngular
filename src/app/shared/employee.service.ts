import { Injectable } from '@angular/core';
import { Employee } from "./employee.model";
import { HttpClient } from "@angular/common/http";
import { Vehicle } from './vehicle.model';

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

   GetSingleEmployee(id : number){
    return this.http.get(this.rootURL+'/Employee'+id)  
  }
}


// export class VehicleService {

//   formData : Vehicle;
//   list: Vehicle[];
//   readonly rootURL = "http://localhost:55741/api"

//   constructor(private http : HttpClient) { }

//   postVehicle (formData: Vehicle){
//     return this.http.post(this.rootURL+'/Vehicle',formData);
//   }

//   refreshList(){
//     this.http.get(this.rootURL+'/Vehicle')
//     .toPromise().then(res => this.list = res as Vehicle[]);
//   }
//   putVehicle (formData: Vehicle){
//     return this.http.put(this.rootURL+'/Vehicle/'+formData.VehicleID,formData);
//   }

//   deleteVehicle(id : number){
//     return this.http.delete(this.rootURL+'/Vehicle/'+id);
//   }


// }
