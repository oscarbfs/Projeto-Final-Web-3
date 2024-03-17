import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewResponseActivityPageComponent } from './overview-response-activity-page.component';

describe('OverviewResponseActivityPageComponent', () => {
  let component: OverviewResponseActivityPageComponent;
  let fixture: ComponentFixture<OverviewResponseActivityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewResponseActivityPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewResponseActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
