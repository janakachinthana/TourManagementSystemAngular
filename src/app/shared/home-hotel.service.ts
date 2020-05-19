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
  readonly rootURL = "https://localhost:44392/api"
>>>>>>> 1787ac4ba482930dadeeb44b1bc9de29d0aea7bb

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



 
