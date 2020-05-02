import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  formData : Vehicle;
  list: Vehicle[];
  readonly rootURL = "https://localhost:44398/api"

  constructor(private http : HttpClient) { }

  postVehicle (formData: Vehicle){
    return this.http.post(this.rootURL+'/Vehicle',formData);
  }

  refreshList(){
    this.http.get(this.rootURL+'/Vehicle')
    .toPromise().then(res => this.list = res as Vehicle[]);
  }
  putVehicle (formData: Vehicle){
    return this.http.put(this.rootURL+'/Vehicle/'+formData.VehicleID,formData);
  }

  deleteVehicle(id : number){
    return this.http.delete(this.rootURL+'/Vehicle/'+id);
  }

  
}
