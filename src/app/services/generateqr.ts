import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Generateqr {

  constructor(private http: HttpClient) {}
  
 baseUrl ='http://localhost:8080/hotel/menu/';
 
    getMenuInfo(hotelId:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${hotelId}}`);
  }
}
