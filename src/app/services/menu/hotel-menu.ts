import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../../../app/model/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class HotelMenuService {
  //private baseUrl = 'http://localhost:8080/hotel/menu';

 // private baseUrl='http://localhost:8080/hotel'

  private baseUrl='http://15.207.117.225:8080/hotel'

  constructor(private http: HttpClient) {}

  getHotelInfo(hotelId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/hotelInfo/${hotelId}`);
  }

    getHotelMenu(hotelId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/menu/${hotelId}`);
  }
}
