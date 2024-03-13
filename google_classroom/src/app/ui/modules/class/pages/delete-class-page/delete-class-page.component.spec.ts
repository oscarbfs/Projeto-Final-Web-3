import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClassPageComponent } from './delete-class-page.component';

describe('DeleteClassPageComponent', () => {
  let component: DeleteClassPageComponent;
  let fixture: ComponentFixture<DeleteClassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteClassPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteClassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
