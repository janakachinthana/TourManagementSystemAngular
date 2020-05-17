import { Injectable } from '@angular/core';
import { Destination } from "./destination.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { HomeDestination } from './home-destination.model';

@Injectable({
  providedIn: 'root'
})
export class HomeDestinationService {
  formData : HomeDestination;
  list : HomeDestination[];

<<<<<<< HEAD
  // readonly rootURL = "https://localhost:44392//api"
  readonly rootURL = "http://localhost:62083/api"
=======
<<<<<<< HEAD

  // readonly rootURL = "https://localhost:44392//api"
  //readonly rootURL = "http://localhost:62083/api"
  readonly rootURL = "https://localhost:44357/api"

=======
<<<<<<< HEAD
  // readonly rootURL = "https://localhost:44392//api"
<<<<<<< HEAD
  readonly rootURL = "https://localhost:44352/api"
=======
  // readonly rootURL = "http://localhost:62083/api"
  readonly rootURL = "https://localhost:44364/api"

=======
<<<<<<< HEAD
  readonly rootURL = "https://localhost:44392/api"
=======
  readonly rootURL = "https://localhost:44392//api"
>>>>>>> 8f34c2fca32a9b2ea797d8e31b98caf51f36b387
>>>>>>> 8698b74a41e04679644a160624966768eb6f6584
>>>>>>> 5386ca679714ee0a1a0d91279d361fb8cce41fa5
>>>>>>> b1454485ae4db31f32d1d16ce5c1d5ac655bc344
>>>>>>> dd5afd772284e20301a2be13b7626df9f51045c1
  constructor(private http : HttpClient) { }


  postDestination(formData : HomeDestination){
    return this.http.post(this.rootURL+'/HomeDestination',formData)
   }
 
   refreshList(){
     this.http.get(this.rootURL+'/HomeDestination')
     .toPromise().then(res => this.list = res as HomeDestination[])
   }
 
   putDestination(formData : HomeDestination){
     return this.http.put(this.rootURL+'/HomeDestination/'+formData.HomeDestinationID,formData)
    }
 
    deleteDestination(id : number){
      return this.http.delete(this.rootURL+'/HomeDestination/'+id);
    }

    GetSingleHomeDestination(id : number): Observable<any>{
      return this.http.get(this.rootURL+'/HomeDestination/' + id)
        
    }
 }
 
