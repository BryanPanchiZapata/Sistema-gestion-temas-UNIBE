import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidRegistrationComponent } from './paid-registration.component';

describe('PaidRegistrationComponent', () => {
  let component: PaidRegistrationComponent;
  let fixture: ComponentFixture<PaidRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
