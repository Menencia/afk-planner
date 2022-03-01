import { TestBed } from '@angular/core/testing';

import { IsSignedGuard } from './is-signed.guard';

describe('IsSignedGuard', () => {
  let guard: IsSignedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsSignedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
