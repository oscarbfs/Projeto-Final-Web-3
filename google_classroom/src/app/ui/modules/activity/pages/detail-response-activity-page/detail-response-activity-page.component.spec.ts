import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailResponseActivityPageComponent } from './detail-response-activity-page.component';

describe('DetailResponseActivityPageComponent', () => {
  let component: DetailResponseActivityPageComponent;
  let fixture: ComponentFixture<DetailResponseActivityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailResponseActivityPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailResponseActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
