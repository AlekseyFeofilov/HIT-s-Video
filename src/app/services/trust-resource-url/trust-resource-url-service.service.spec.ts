import { TestBed } from '@angular/core/testing';

import { TrustResourceUrlService } from './trust-resource-url.service';

describe('TrustResourceUrlService', () => {
  let service: TrustResourceUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrustResourceUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
