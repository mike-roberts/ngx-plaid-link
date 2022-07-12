import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaidLinkComponent } from './plaid-link.component';

describe('PlaidLinkComponent', () => {
  let component: PlaidLinkComponent;
  let fixture: ComponentFixture<PlaidLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaidLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaidLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
