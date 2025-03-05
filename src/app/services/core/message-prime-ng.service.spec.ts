import { TestBed } from '@angular/core/testing';

import { MessagePrimeNgService } from './message-prime-ng.service';

describe('MessagePrimeNgService', () => {
  let service: MessagePrimeNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagePrimeNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
