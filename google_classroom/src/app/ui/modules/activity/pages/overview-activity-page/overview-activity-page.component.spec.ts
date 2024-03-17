import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewActivityPageComponent } from './overview-activity-page.component';

describe('OverviewActivityPageComponent', () => {
  let component: OverviewActivityPageComponent;
  let fixture: ComponentFixture<OverviewActivityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewActivityPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
