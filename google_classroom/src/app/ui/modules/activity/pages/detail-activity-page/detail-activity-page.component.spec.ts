import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailActivityPageComponent } from './detail-activity-page.component';

describe('DetailActivityPageComponent', () => {
  let component: DetailActivityPageComponent;
  let fixture: ComponentFixture<DetailActivityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailActivityPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
