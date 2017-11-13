import { TestBed, inject } from '@angular/core/testing';

import { EspService } from './esp.service';

describe('EspService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspService]
    });
  });

  it('should be created', inject([EspService], (service: EspService) => {
    expect(service).toBeTruthy();
  }));
});
