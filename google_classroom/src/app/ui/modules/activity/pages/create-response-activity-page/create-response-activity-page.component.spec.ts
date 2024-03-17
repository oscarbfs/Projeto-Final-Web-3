import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResponseActivityPageComponent } from './create-response-activity-page.component';

describe('CreateResponseActivityPageComponent', () => {
  let component: CreateResponseActivityPageComponent;
  let fixture: ComponentFixture<CreateResponseActivityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateResponseActivityPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateResponseActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
