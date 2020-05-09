import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Home } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  formData : Home;
  list : Home[];

  readonly rootURL = "https://localhost:44398//api"
  constructor(private http : HttpClient) { }


  postHome(formData : Home){
    return this.http.post(this.rootURL+'/Costing',formData)
   }
 
   refreshList(){
     this.http.get(this.rootURL+'/Costing')
     .toPromise().then(res => this.list = res as Home[])
   }
 
   putHome(formData : Home){
     return this.http.put(this.rootURL+'/Costing/'+formData.homeID,formData)
    }
 
    deleteHome(id : number){
      return this.http.delete(this.rootURL+'/Costing/'+id);
    }
 }
 

