import { Injectable } from '@angular/core';
import { Driver } from './driver.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  formData : Driver;
  list : Driver[];
  readonly rootURL = "https://localhost:44355/api"

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
}
