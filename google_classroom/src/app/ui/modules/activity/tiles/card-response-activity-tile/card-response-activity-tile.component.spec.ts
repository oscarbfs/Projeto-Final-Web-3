import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResponseActivityTileComponent } from './card-response-activity-tile.component';

describe('CardResponseActivityTileComponent', () => {
  let component: CardResponseActivityTileComponent;
  let fixture: ComponentFixture<CardResponseActivityTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardResponseActivityTileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardResponseActivityTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
