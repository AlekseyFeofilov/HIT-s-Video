import { TestBed } from '@angular/core/testing';

import { ErrorHandlerMiddleware } from './error-handler.middleware';

describe('ErrorHandlerMiddleware', () => {
  let service: ErrorHandlerMiddleware;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerMiddleware);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
