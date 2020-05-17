import { Injectable } from '@angular/core';
import { Driver } from './driver.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  formData : Driver;
  list : Driver[];
<<<<<<< HEAD
  
  
=======
<<<<<<< HEAD
  // readonly rootURL = "https://localhost:44392/api"
<<<<<<< HEAD
  readonly rootURL = "https://localhost:44352/api"
=======
  // readonly rootURL = "http://localhost:62083/api"
  readonly rootURL = "https://localhost:44364/api"
>>>>>>> b1454485ae4db31f32d1d16ce5c1d5ac655bc344

=======
  readonly rootURL = "https://localhost:44392/api"
>>>>>>> 8698b74a41e04679644a160624966768eb6f6584
>>>>>>> 5386ca679714ee0a1a0d91279d361fb8cce41fa5

  // readonly rootURL = "https://localhost:44392/api"
  //readonly rootURL = "http://localhost:62083/api"
  readonly rootURL = "https://localhost:44357/api"
  constructor(public http : HttpClient) { }

  postDriver(formData : Driver){
    return this.http.post(this.rootURL+'/Driver',formData);
  }

  refreshList(){
    this.http.get(this.rootURL+'/Driver')
    .toPromise().then(res => this.list = res as Driver[]);
  }

  putDriver(formData : Driver){
    return this.http.put(this.rootURL+'/Driver/'+formData.DriverID,formData);
  }

  deleteDriver(id : number){
    return this.http.delete(this.rootURL+'/Driver/'+id);
  }

  GetSingleDriver(id : number): Observable<any>{
    return this.http.get(this.rootURL+'/Driver/' + id)
      
  }
}
