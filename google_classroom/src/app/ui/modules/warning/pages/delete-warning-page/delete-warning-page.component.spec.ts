import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWarningPageComponent } from './delete-warning-page.component';

describe('DeleteWarningPageComponent', () => {
  let component: DeleteWarningPageComponent;
  let fixture: ComponentFixture<DeleteWarningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteWarningPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteWarningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
