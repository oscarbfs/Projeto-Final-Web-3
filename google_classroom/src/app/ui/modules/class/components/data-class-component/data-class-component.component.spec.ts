import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataClassComponentComponent } from './data-class-component.component';

describe('DataClassComponentComponent', () => {
  let component: DataClassComponentComponent;
  let fixture: ComponentFixture<DataClassComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataClassComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataClassComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
