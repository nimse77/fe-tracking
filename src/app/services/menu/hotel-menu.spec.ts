import { TestBed } from '@angular/core/testing';

import { HotelMenu } from './hotel-menu';

describe('HotelMenu', () => {
  let service: HotelMenu;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelMenu);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
