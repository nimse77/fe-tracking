import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../../../app/model/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class HotelMenuService {
  private baseUrl = 'http://localhost:8080/hotel/menu';

  constructor(private http: HttpClient) {}

  getHotelMenu(hotelId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${hotelId}`);
  }
}
