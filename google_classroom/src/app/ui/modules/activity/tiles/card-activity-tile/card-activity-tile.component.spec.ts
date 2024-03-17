import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActivityTileComponent } from './card-activity-tile.component';

describe('CardActivityTileComponent', () => {
  let component: CardActivityTileComponent;
  let fixture: ComponentFixture<CardActivityTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardActivityTileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardActivityTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
