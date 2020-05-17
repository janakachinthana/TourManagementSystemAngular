import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Home } from './home.model';
@Injectable({
  providedIn: 'root'
})
export class ConfirmedService {
  formData : Home;
  list : Home[];

  // readonly rootURL = "https://localhost:44392/api"
  readonly rootURL = "http://localhost:62083/api"
=======
<<<<<<< HEAD
  // readonly rootURL = "https://localhost:44392/api"
<<<<<<< HEAD
  readonly rootURL = "https://localhost:44352/api"
=======
  //readonly rootURL = "http://localhost:62083/api"
  readonly rootURL = "https://localhost:44357/api"
<<<<<<< HEAD
=======
=======
<<<<<<< HEAD
  // readonly rootURL = "https://localhost:44392/api"
  // readonly rootURL = "http://localhost:62083/api"
  readonly rootURL = "https://localhost:44364/api"

=======
  readonly rootURL = "https://localhost:44392/api"
>>>>>>> 8698b74a41e04679644a160624966768eb6f6584
>>>>>>> 5386ca679714ee0a1a0d91279d361fb8cce41fa5
>>>>>>> b1454485ae4db31f32d1d16ce5c1d5ac655bc344
>>>>>>> dd5afd772284e20301a2be13b7626df9f51045c1
>>>>>>> 7c09cd10bf17d45d26aaf60b780ea5e667fc8a20
  constructor(private http : HttpClient) { }


  postHome(formData : Home){
    return this.http.post(this.rootURL+'/Confirmed',formData)
   }
 
   refreshList(){
     this.http.get(this.rootURL+'/Confirmed')
     .toPromise().then(res => this.list = res as Home[])
   }
 
   putHome(formData : Home){
     return this.http.put(this.rootURL+'/Confirmed/'+formData.homeID,formData)
    }
 
    deleteHome(id : number){
      return this.http.delete(this.rootURL+'/Confirmed/'+id);
    }
 }
 

