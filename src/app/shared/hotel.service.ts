import { Injectable } from '@angular/core';
import { Hotel } from "./hotel.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  
  formData : Hotel;
  list : Hotel[];

<<<<<<< HEAD
  // readonly rootURL = "https://localhost:44392//api"
  // readonly rootURL = "http://localhost:62083/api"
  readonly rootURL = "https://localhost:44364/api"

=======
<<<<<<< HEAD
  readonly rootURL = "https://localhost:44392/api"
=======
  readonly rootURL = "https://localhost:44392//api"
>>>>>>> 8f34c2fca32a9b2ea797d8e31b98caf51f36b387
>>>>>>> 8698b74a41e04679644a160624966768eb6f6584
  constructor(private http : HttpClient) { }


  postHotel(formData : Hotel){
    return this.http.post(this.rootURL+'/hotel',formData)
   }
 
   refreshList(){
     this.http.get(this.rootURL+'/hotel')
     .toPromise().then(res => this.list = res as Hotel[])
   }
 
   putHotel(formData : Hotel){
     return this.http.put(this.rootURL+'/hotel/'+formData.HotelID,formData)
    }
 
    deleteHotel(id : number){
      return this.http.delete(this.rootURL+'/hotel/'+id);
    }

    GetSingleHotel(id : number): Observable<any>{
      return this.http.get(this.rootURL+'/hotel/' + id)
        
    }
 }
 

