import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActivityPageComponent } from './update-activity-page.component';

describe('UpdateActivityPageComponent', () => {
  let component: UpdateActivityPageComponent;
  let fixture: ComponentFixture<UpdateActivityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateActivityPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
