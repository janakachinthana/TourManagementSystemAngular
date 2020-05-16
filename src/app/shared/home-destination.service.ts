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
  readonly rootURL = "https://localhost:44392/api"
=======

  // readonly rootURL = "https://localhost:44392//api"
  //readonly rootURL = "http://localhost:62083/api"
  readonly rootURL = "https://localhost:44357/api"

>>>>>>> 2cf66ef927a34125862290ca6bbe205bd598cefc
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

