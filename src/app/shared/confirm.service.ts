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
  readonly rootURL = "https://localhost:44392/api"
  // readonly rootURL = "http://localhost:62083/api"
=======
<<<<<<< HEAD
  readonly rootURL = "https://localhost:44392/api"
=======
  // readonly rootURL = "https://localhost:44392/api"
  readonly rootURL = "http://localhost:62083/api"
>>>>>>> b705e94a3884c9914305dda14ced14e8094666a4
>>>>>>> 5e35cbbd083a66797195246c269a05831080a59c
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
 

