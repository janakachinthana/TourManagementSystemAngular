import { Injectable } from '@angular/core';
import { Destination } from './destination.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  formData : Destination;
  list : Destination[];
  readonly rootURL = "https://localhost:44381/api"

  constructor(private http : HttpClient) { }

  postDestination(formData : Destination){
    return this.http.post(this.rootURL+'/destination', formData);
  }

  refreshList(){
    this.http.get(this.rootURL+'/destination')
    .toPromise().then(res => this.list = res as Destination[]);
  }

  putDestination(formData : Destination){
    return this.http.put(this.rootURL+'/destination/'+formData.DestinationID, formData);
  }

  deleteDestination(id : number){
    return this.http.delete(this.rootURL+'/destination/'+id);
  }
}
