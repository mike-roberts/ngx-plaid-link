import { TestBed, inject } from '@angular/core/testing';

import { NgxPlaidLinkService } from './ngx-plaid-link.service';

describe('NgxPlaidLinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxPlaidLinkService]
    });
  });

  it('should be created', inject([NgxPlaidLinkService], (service: NgxPlaidLinkService) => {
    expect(service).toBeTruthy();
  }));
});
