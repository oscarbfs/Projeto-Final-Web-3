import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveClassPageComponent } from './leave-class-page.component';

describe('LeaveClassPageComponent', () => {
  let component: LeaveClassPageComponent;
  let fixture: ComponentFixture<LeaveClassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveClassPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveClassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
