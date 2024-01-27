import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAuthPageComponent } from './signup-auth-page.component';

describe('SignupAuthPageComponent', () => {
  let component: SignupAuthPageComponent;
  let fixture: ComponentFixture<SignupAuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupAuthPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
