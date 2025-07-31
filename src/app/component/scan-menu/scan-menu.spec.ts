import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanMenu } from './scan-menu';

describe('ScanMenu', () => {
  let component: ScanMenu;
  let fixture: ComponentFixture<ScanMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScanMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
