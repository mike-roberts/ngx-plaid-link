import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPlaidLinkComponent } from './ngx-plaid-link.component';

describe('NgxPlaidLinkComponent', () => {
  let component: NgxPlaidLinkComponent;
  let fixture: ComponentFixture<NgxPlaidLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPlaidLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPlaidLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
