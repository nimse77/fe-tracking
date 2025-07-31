// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-scan-menu',
//   standalone: false,
//   templateUrl: './scan-menu.html',
//   styleUrl: './scan-menu.scss'
// })
// export class ScanMenu {
//   distance:number=0;
//   menuVisible=false;
//   message='';

//   constructor(private http:HttpClient){
//     this.onQRCodeScanned("hotel123");
//   }

//   async onQRCodeScanned(id: string){
//     try{
//       const hotelId=id;
//       const hotelLoc: any= await this.http
//           .get(`http://localhost:8080/hotel/menu/${hotelId}`).toPromise();


//           console.log(hotelLoc);
//           console.log('Latitude type:', typeof hotelLoc.latitude);

//           navigator.geolocation.getCurrentPosition((pos) =>{
//             console.log("hotelLoc",hotelLoc);
//             const customerLat=pos.coords.latitude;
//             const customerLng=pos.coords.longitude;
//             const hotelLat = Number(hotelLoc[0].latitude);
//             const hotelLng = Number(hotelLoc[0].longitude);

//           this.distance = this.calculateDistance(
//             customerLat,
//             customerLng,
//             hotelLat,
//             hotelLng
//           );

//             if (this.distance <= 100) {
//               this.menuVisible = true;
//               this.message = '';
//             } else {
//               this.menuVisible = false;
//               this.message = 'You are not within the allowed 100-meter radius.';
//               console.log(this.message);
//             }

//           });
//           } catch (err) {
//                console.error('Error fetching hotel location:', err);
//          }
    
//   }

//     // Haversine formula
//   calculateDistance(lat1: number, lon1: number, lat2: any, lon2: any): number {
//     const R = 6371e3; // meters
//     const φ1 = lat1 * Math.PI/180;
//     const φ2 = lat2 * Math.PI/180;
//     const Δφ = (lat2 - lat1) * Math.PI/180;
//     const Δλ = (lon2 - lon1) * Math.PI/180;

//     const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//               Math.cos(φ1) * Math.cos(φ2) *
//               Math.sin(Δλ/2) * Math.sin(Δλ/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

//     return R * c; // in meters
//   }
// }


