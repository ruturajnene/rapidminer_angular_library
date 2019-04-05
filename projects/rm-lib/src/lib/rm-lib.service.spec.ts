import { TestBed, inject } from '@angular/core/testing';

import { RmLibService } from './rm-lib.service';

describe('RmLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RmLibService]
    });
  });

  it('should be created', inject([RmLibService], (service: RmLibService) => {
    expect(service).toBeTruthy();
  }));
});
