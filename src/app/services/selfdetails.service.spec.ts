import { TestBed } from '@angular/core/testing';

import { SelfdetailsService } from '../services/selfdetails.service';

describe('SelfdetailsService', () => {
  let service: SelfdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
