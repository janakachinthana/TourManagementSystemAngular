import { Injectable } from '@angular/core';
import { Guide } from "./guide.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  formData : Guide;
  list : Guide[];

  readonly rootURL = "https://localhost:44352/api"

  constructor(public http : HttpClient) { }

  postGuide(formData : Guide){
    return this.http.post(this.rootURL+'/Guide',formData)
   }
 
   refreshList(){
     this.http.get(this.rootURL+'/Guide')
     .toPromise().then(res => this.list = res as Guide[])
   }
 
   putGuide(formData : Guide){
     return this.http.put(this.rootURL+'/Guide/'+formData.GuideID,formData)
    }
 
    deleteGuide(id : number){
      return this.http.delete(this.rootURL+'/Guide/'+id);
    }
}





 
