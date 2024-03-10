import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClassPageComponent } from './detail-class-page.component';

describe('DetailClassPageComponent', () => {
  let component: DetailClassPageComponent;
  let fixture: ComponentFixture<DetailClassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailClassPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailClassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
