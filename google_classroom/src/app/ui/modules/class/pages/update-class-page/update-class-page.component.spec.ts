import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClassPageComponent } from './update-class-page.component';

describe('UpdateClassPageComponent', () => {
  let component: UpdateClassPageComponent;
  let fixture: ComponentFixture<UpdateClassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateClassPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateClassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
