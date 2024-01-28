import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewClassPageComponent } from './overview-class-page.component';

describe('OverviewClassPageComponent', () => {
  let component: OverviewClassPageComponent;
  let fixture: ComponentFixture<OverviewClassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewClassPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewClassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
