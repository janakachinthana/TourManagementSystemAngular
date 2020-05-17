import { Injectable } from '@angular/core';
import { HomeHotel } from './home-hotel.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeHotelService {

  formData : HomeHotel;
  list : HomeHotel[];
  guide1 : HomeHotel;

<<<<<<< HEAD
  // readonly rootURL = "https://localhost:44392/api"
  //readonly rootURL = "http://localhost:62083/api"
  readonly rootURL = "https://localhost:44357/api"
=======
<<<<<<< HEAD
  // readonly rootURL = "https://localhost:44392/api"
  // readonly rootURL = "http://localhost:62083/api"
  readonly rootURL = "https://localhost:44364/api"

=======
  readonly rootURL = "https://localhost:44392/api"
>>>>>>> 8698b74a41e04679644a160624966768eb6f6584
>>>>>>> 5386ca679714ee0a1a0d91279d361fb8cce41fa5

  constructor(public http : HttpClient) { }

  postHomeHotel(formData : HomeHotel[]){
    return this.http.post(this.rootURL+'/HomeHotel',formData)
   }
 
   refreshList(){
     this.http.get(this.rootURL+'/HomeHotel')
     .toPromise().then(res => this.list = res as HomeHotel[])
   }
 
   putHomeHotel(formData : HomeHotel){
     return this.http.put(this.rootURL+'/HomeHotel/'+formData.HomeHotelID,formData)
    }
 
    deleteHomeHotel(id : number){
      return this.http.delete(this.rootURL+'/HomeHotel/'+id);
    }
    GetSingleHomeHotel(id : number): Observable<any>{
      return this.http.get(this.rootURL+'/HomeHotel/' + id)
        
    }
}



 
