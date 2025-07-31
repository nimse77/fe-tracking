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
  hotelData: any = null;  // single hotel object
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
    this.menuService.getHotelInfo(this.hotelId).subscribe(data => {
      this.hotelData = data;
      this.hotelId=this.hotelData.hotelId;
      this.hotelLat = Number(this.hotelData.latitude);
      this.hotelLng = Number(this.hotelData.longitude);
      this.checkUserLocation();
    });
  }

  checkUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          const distance = this.getDistanceFromLatLonInMeters(
            userLat, userLng, this.hotelLat, this.hotelLng
          );

          this.ngZone.run(() => {
            if (distance <= 100) {
              this.showMenu = true;
               this.menuService.getHotelMenu(this.hotelId).subscribe(data => {
                this.hotelData = data;
                this.hotelId=this.hotelData.hotelId;
                });
              this.errorMessage = 'your are in hotel';
            } else {
              this.showMenu = false;
              this.errorMessage = 'You are not within 100 meters of the hotel.';
              console.log("this",this.errorMessage);
            }
          });
        },
        (error) => {
          this.ngZone.run(() => {
            this.showMenu = false;
            this.errorMessage = 'Location access denied.';
            console.log("denied",this.errorMessage);
          });
        }
      );
    } else {
      this.ngZone.run(() => {
        this.showMenu = false;
        this.errorMessage = 'Geolocation not supported by this browser.';
        console.log("browser",this.errorMessage);
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

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
