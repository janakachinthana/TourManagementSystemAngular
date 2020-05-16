import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Home } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class CompletedService {
  formData : Home;
  list : Home[];

  readonly rootURL = "https://localhost:44392/api"
  constructor(private http : HttpClient) { }


  postHome(formData : Home){
    return this.http.post(this.rootURL+'/Completed',formData)
   }
 
   refreshList(){
     this.http.get(this.rootURL+'/Completed')
     .toPromise().then(res => this.list = res as Home[])
   }
 
   putHome(formData : Home){
     return this.http.put(this.rootURL+'/Completed/'+formData.homeID,formData)
    }
 
    deleteHome(id : number){
      return this.http.delete(this.rootURL+'/Completed/'+id);
    }
 }
 

