import { Injectable } from '@angular/core';
import { Destination } from './destination.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  formData : Destination;
  list : Destination[];
  // readonly rootURL = "https://localhost:44392/api"
  //readonly rootURL = "http://localhost:62083/api"
  readonly rootURL = "https://localhost:44357/api"
  constructor(private http : HttpClient) { }

  postDestination(formData : Destination){
    return this.http.post(this.rootURL+'/Destination', formData);
  }

  refreshList(){
    this.http.get(this.rootURL+'/Destination')
    .toPromise().then(res => this.list = res as Destination[]);
  }

  refreshMedel(id : number){
    this.http.get(this.rootURL+'/Destination'+id)
    .toPromise().then(res => this.list = res as Destination[]);
  }

  putDestination(formData : Destination){
    return this.http.put(this.rootURL+'/Destination/'+formData.DestinationID, formData);
  }

  deleteDestination(id : number){
    return this.http.delete(this.rootURL+'/Destination/'+id);
  }
  GetSingleHomeDestination(id : number): Observable<any>{
    return this.http.get(this.rootURL+'/Destination/' + id)
      
  }
}
