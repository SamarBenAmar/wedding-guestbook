import { TestBed } from '@angular/core/testing';

import { GuestbookStateService } from './guestbook-state-service';

describe('GuestbookStateService', () => {
  let service: GuestbookStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestbookStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
