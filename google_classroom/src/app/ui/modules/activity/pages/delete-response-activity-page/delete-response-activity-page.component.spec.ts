import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResponseActivityPageComponent } from './delete-response-activity-page.component';

describe('DeleteResponseActivityPageComponent', () => {
  let component: DeleteResponseActivityPageComponent;
  let fixture: ComponentFixture<DeleteResponseActivityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteResponseActivityPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteResponseActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
