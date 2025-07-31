import { TestBed } from '@angular/core/testing';

import { Generateqr } from './generateqr';

describe('Generateqr', () => {
  let service: Generateqr;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Generateqr);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
