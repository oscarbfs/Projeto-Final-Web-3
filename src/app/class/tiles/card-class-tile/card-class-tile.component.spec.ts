import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardClassTileComponent } from './card-class-tile.component';

describe('CardClassTileComponent', () => {
  let component: CardClassTileComponent;
  let fixture: ComponentFixture<CardClassTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardClassTileComponent]
    });
    fixture = TestBed.createComponent(CardClassTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
