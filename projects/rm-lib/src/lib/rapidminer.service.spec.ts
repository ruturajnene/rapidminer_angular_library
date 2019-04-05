import { TestBed, inject } from '@angular/core/testing';

import { RapidMinerService } from './rapidminer.service';

describe('RapidMinerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RapidMinerService]
    });
  });

  it('should be created', inject([RapidMinerService], (service: RapidMinerService) => {
    expect(service).toBeTruthy();
  }));
});
