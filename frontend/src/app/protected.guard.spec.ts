import { TestBed } from '@angular/core/testing';

import { ProtectedGuard } from './protected.guard';

describe('ProtectedGuardGuard', () => {
  let guard: ProtectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
