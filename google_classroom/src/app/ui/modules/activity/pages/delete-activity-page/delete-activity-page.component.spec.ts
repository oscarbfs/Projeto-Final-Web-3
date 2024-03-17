import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteActivityPageComponent } from './delete-activity-page.component';

describe('DeleteActivityPageComponent', () => {
  let component: DeleteActivityPageComponent;
  let fixture: ComponentFixture<DeleteActivityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteActivityPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
