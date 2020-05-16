import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  formData : Vehicle;
  list: Vehicle[];
<<<<<<< HEAD
=======
  readonly rootURL = "https://localhost:44392/api"
>>>>>>> 5290cfde8c428d15adffb4a5daa34e510a6e6338

  // readonly rootURL = "https://localhost:44392/api"
  //readonly rootURL = "http://localhost:62083/api"
  readonly rootURL = "https://localhost:44357/api"
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

  GetSingleVehicle(id : number): Observable<any>{
    return this.http.get(this.rootURL+'/Vehicle/' + id)
      
  }
}
