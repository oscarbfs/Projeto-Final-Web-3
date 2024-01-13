import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewClassTabComponent } from './overview-class-tab.component';

describe('OverviewClassTabComponent', () => {
  let component: OverviewClassTabComponent;
  let fixture: ComponentFixture<OverviewClassTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewClassTabComponent]
    });
    fixture = TestBed.createComponent(OverviewClassTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
