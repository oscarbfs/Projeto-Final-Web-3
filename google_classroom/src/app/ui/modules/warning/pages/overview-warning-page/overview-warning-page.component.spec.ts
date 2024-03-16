import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewWarningPageComponent } from './overview-warning-page.component';

describe('OverviewWarningPageComponent', () => {
  let component: OverviewWarningPageComponent;
  let fixture: ComponentFixture<OverviewWarningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewWarningPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewWarningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
