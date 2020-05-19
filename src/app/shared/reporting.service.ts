import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  readonly rootURL = "http://localhost:62083/api"

  constructor(private _http: HttpClient) { }

  downloadReport(id:number, selection: number, type: number) {
    //return this._http.get('https://localhost:44392/api/Reports/downloadReport?type=' + type, {responseType : 'blob'});



    if (id == 0 && selection == 1 && type == 1) {
      // this means a report should be generated with all the records in the customer table
      return this._http.get(this.rootURL + 'id=' + id + '&selection=' + selection + '&type=' + type, {responseType : 'blob'});
    } else {

      // here type == 1 gonna be TRUE because we have to pass 1 from the function in the HTML file in order to make sure we gonna make a PDF
      // but for the backend code; we have to pass 2 here (in the return statement below)
      selection = 2;
      type = 2;  // I changed the type to 2

/*    this means a report should be generated with the data related to a particular customer requirement
      id = customer requirement ID
      selection = 2
      type = 2
      example = https://localhost:44392/api/Reports/downloadReport?id=7&selection=2&type=2 */

      return this._http.get(this.rootURL + 'id=' + id + '&selection=' + selection + '&type=' + type, {responseType : 'blob'});
    }
  }
}
