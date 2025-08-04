import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Generateqr {

  constructor(private http: HttpClient) {}
  
 baseUrl ='https://13.204.69.86/menu/';
 
    getMenuInfo(hotelId:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${hotelId}}`);
  }
}
