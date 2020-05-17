import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Home } from './home.model';
@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  formData : Home;
  list : Home[];

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
  constructor(private http : HttpClient) { }


  postHome(formData : Home){
    return this.http.post(this.rootURL+'/Confirm',formData)
   }
 
   refreshList(){
     this.http.get(this.rootURL+'/Confirm')
     .toPromise().then(res => this.list = res as Home[])
   }
 
   putHome(formData : Home){
     return this.http.put(this.rootURL+'/Confirm/'+formData.homeID,formData)
    }
 
    deleteHome(id : number){
      return this.http.delete(this.rootURL+'/Confirm/'+id);
    }
 }
 

