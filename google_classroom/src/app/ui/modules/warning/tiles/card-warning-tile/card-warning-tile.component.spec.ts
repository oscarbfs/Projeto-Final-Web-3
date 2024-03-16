import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWarningTileComponent } from './card-warning-tile.component';

describe('CardWarningTileComponent', () => {
  let component: CardWarningTileComponent;
  let fixture: ComponentFixture<CardWarningTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWarningTileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardWarningTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
