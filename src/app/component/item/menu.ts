// import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-menu',
// //   standalone: false,
// //   templateUrl: './menu.html',
// //   styleUrl: './menu.scss'
// // })
// // export class Menu  implements OnInit {

// // }

// menu.component.ts
import { Component, OnInit,NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scan-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu  {
  hotelId: string = 'hotel123'; // You’ll get this from the scanned QR code
  hotelLat: number = 0;
  hotelLng: number = 0;
  withinRadius: boolean = false;
  showMenu: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient,private ngZone: NgZone) {}

  ngOnInit() {
    this.getHotelLocation(this.hotelId);
  }

  getHotelLocation(hotelId: string) {
    this.http.get<any>(`http://localhost:8080/hotel/menu/${hotelId}`).subscribe({
      next: (hotel) => {
        this.hotelLat = Number(hotel[0].latitude);
        this.hotelLng = Number(hotel[0].longitude) ;
        this.checkUserLocation();
      },
      error: () => {
        this.errorMessage = 'Failed to fetch hotel details.';
      }
    });
  }

  checkUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      const distance = this.getDistanceFromLatLonInMeters(userLat, userLng, this.hotelLat, this.hotelLng);

      this.ngZone.run(() => {  // ← THIS IS THE FIX
        if (distance <= 100) {
          this.showMenu = true;
          this.errorMessage = '';
        } else {
          this.showMenu = false;
          this.errorMessage = 'You are not within 100 meters of the hotel.';
          console.log(this.errorMessage); // Confirm it logs
        }
      });
    }, (error) => {
      this.ngZone.run(() => {
        this.showMenu = false;
        this.errorMessage = 'Location access denied.';
      });
    });
  } else {
    this.ngZone.run(() => {
      this.showMenu = false;
      this.errorMessage = 'Geolocation not supported.';
    });
  }
}

  getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth radius in meters
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
