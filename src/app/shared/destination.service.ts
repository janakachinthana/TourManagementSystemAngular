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
<<<<<<< HEAD
=======
<<<<<<< HEAD
  // readonly rootURL = "https://localhost:44392/api"
  readonly rootURL = "http://localhost:62083/api"
=======
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
>>>>>>> dd5afd772284e20301a2be13b7626df9f51045c1
>>>>>>> 7c09cd10bf17d45d26aaf60b780ea5e667fc8a20

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
