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
  readonly rootURL = "https://localhost:44392/api"
>>>>>>> 571d02ff66c4f3b62bac3c131230483c53ee9adc

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
