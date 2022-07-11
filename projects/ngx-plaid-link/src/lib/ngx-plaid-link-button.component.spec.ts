import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPlaidLinkButtonComponent } from './ngx-plaid-link-button.component';

describe('NgxPlaidLinkComponent', () => {
  let component: NgxPlaidLinkButtonComponent;
  let fixture: ComponentFixture<NgxPlaidLinkButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxPlaidLinkButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPlaidLinkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
