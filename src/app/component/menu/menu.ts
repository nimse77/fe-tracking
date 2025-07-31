// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-menu',
//   standalone: false,
//   templateUrl: './menu.html',
//   styleUrl: './menu.scss'
// })
// export class Menu {

// }

// menu.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelMenuService } from '../../../app/services/menu/hotel-menu';
import { MenuItem } from '../../../app/model/MenuItem';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent implements OnInit {
  hotelId: string = 'hotel123';
  menuItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private menuService: HotelMenuService
  ) {}

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('hotelId') || 'hotel123';
    this.menuService.getHotelMenu(this.hotelId).subscribe(items => {
      this.menuItems = items;
    });
  }
}

