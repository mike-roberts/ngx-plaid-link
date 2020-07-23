import { NgxPlaidLinkDirective } from './ngx-plaid-link.directive';
import { NgxPlaidLinkService } from './ngx-plaid-link.service';
import { TestBed } from '@angular/core/testing';

describe('NgxPlaidLinkDirective', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({
      providers: [NgxPlaidLinkService]
    });

    const directive = new NgxPlaidLinkDirective(TestBed.get(NgxPlaidLinkService));
    expect(directive).toBeTruthy();
  });
});
