import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWarningPageComponent } from './create-warning-page.component';

describe('CreateWarningPageComponent', () => {
  let component: CreateWarningPageComponent;
  let fixture: ComponentFixture<CreateWarningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWarningPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWarningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
