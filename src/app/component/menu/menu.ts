import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelMenuService } from '../../../app/services/menu/hotel-menu';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent implements OnInit {
  hotelId: string = '';
  hotelData: any = null; // still for hotel details
  menuData: any[] = [];  // for menu items
  showMenu: boolean = false;
  errorMessage: string = '';
  hotelLat: number = 0;
  hotelLng: number = 0;

  constructor(
    private route: ActivatedRoute,
    private menuService: HotelMenuService,
    private ngZone: NgZone
  ) {}

ngOnInit(): void {
  this.hotelId = this.route.snapshot.paramMap.get('hotelId') || 'hotel123';
  console.log("hotelId from URL:", this.hotelId);

  this.menuService.getHotelInfo(this.hotelId).subscribe(data => {
    console.log("Received hotel info:", data);
    this.hotelData = data;
    this.hotelLat = Number(this.hotelData.latitude);
    this.hotelLng = Number(this.hotelData.longitude);
    this.checkUserLocation();
  }, error => {
    console.error("Failed to load hotel info:", error);
  });
}

checkUserLocation() {
  console.log("Checking location...");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Got location:", position);
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const distance = this.getDistanceFromLatLonInMeters(
          userLat, userLng, this.hotelLat, this.hotelLng
        );

        console.log("Distance:", distance);

        this.ngZone.run(() => {
          if (distance <= 100) {
            console.log("Within range, fetching menu...");
            this.showMenu = true;
            this.menuService.getHotelMenu(this.hotelId).subscribe(data => {
              console.log("Menu data received:", data);
              this.menuData = data;
            });
          } else {
            this.showMenu = false;
            this.errorMessage = 'You are not within 100 meters of the hotel.';
          }
        });
      },
      (error) => {
        console.log("Geolocation error:", error);
        this.ngZone.run(() => {
          this.showMenu = false;
          this.errorMessage = 'Location access denied.';
        });
      }
    );
  } else {
    this.ngZone.run(() => {
      this.showMenu = false;
      this.errorMessage = 'Geolocation not supported by this browser.';
    });
  }
}


  getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
