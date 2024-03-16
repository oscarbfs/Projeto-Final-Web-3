import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWarningPageComponent } from './update-warning-page.component';

describe('UpdateWarningPageComponent', () => {
  let component: UpdateWarningPageComponent;
  let fixture: ComponentFixture<UpdateWarningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateWarningPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateWarningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
