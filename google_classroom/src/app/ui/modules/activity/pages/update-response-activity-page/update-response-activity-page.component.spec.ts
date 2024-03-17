import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResponseActivityPageComponent } from './update-response-activity-page.component';

describe('UpdateResponseActivityPageComponent', () => {
  let component: UpdateResponseActivityPageComponent;
  let fixture: ComponentFixture<UpdateResponseActivityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateResponseActivityPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateResponseActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
