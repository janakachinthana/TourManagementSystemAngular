import { Injectable } from '@angular/core';
import { Guide } from "./guide.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  formData : Guide;
  list : Guide[];
  guide1 : Guide;

  readonly rootURL = "https://localhost:44398/api"

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
    GetSingleGuid(id : number): Observable<any>{
      return this.http.get(this.rootURL+'/Guide/' + id)
        
    }
}



 
