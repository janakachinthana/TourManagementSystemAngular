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
<<<<<<< HEAD
  // readonly rootURL = "https://localhost:44392/api"
<<<<<<< HEAD
  readonly rootURL = "https://localhost:44352/api"
=======
  // readonly rootURL = "http://localhost:62083/api"
  readonly rootURL = "https://localhost:44364/api"
=======
  readonly rootURL = "https://localhost:44392/api"
>>>>>>> 8698b74a41e04679644a160624966768eb6f6584
>>>>>>> 5386ca679714ee0a1a0d91279d361fb8cce41fa5
>>>>>>> b1454485ae4db31f32d1d16ce5c1d5ac655bc344

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
