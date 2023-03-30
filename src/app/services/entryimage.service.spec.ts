import { TestBed } from '@angular/core/testing';

import { EntryimageService } from './entryimage.service';

describe('EntryimageService', () => {
  let service: EntryimageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryimageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
