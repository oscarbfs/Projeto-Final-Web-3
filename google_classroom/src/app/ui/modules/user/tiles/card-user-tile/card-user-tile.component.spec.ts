import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUserTileComponent } from './card-user-tile.component';

describe('CardUserTileComponent', () => {
  let component: CardUserTileComponent;
  let fixture: ComponentFixture<CardUserTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUserTileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardUserTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
