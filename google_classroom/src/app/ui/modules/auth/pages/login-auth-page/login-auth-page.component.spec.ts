import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAuthPageComponent } from './login-auth-page.component';

describe('LoginAuthPageComponent', () => {
  let component: LoginAuthPageComponent;
  let fixture: ComponentFixture<LoginAuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAuthPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
