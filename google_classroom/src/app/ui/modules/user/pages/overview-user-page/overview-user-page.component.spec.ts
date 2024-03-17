import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewUserPageComponent } from './overview-user-page.component';

describe('OverviewUserPageComponent', () => {
  let component: OverviewUserPageComponent;
  let fixture: ComponentFixture<OverviewUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewUserPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
