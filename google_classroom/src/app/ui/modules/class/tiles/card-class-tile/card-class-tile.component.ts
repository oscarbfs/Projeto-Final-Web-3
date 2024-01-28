import { Component, Input } from '@angular/core';

@Component({
  selector: 'gc-card-class-tile',
  standalone: true,
  imports: [],
  templateUrl: './card-class-tile.component.html',
  styleUrl: './card-class-tile.component.css'
})
export class CardClassTileComponent {
  @Input() className: String | undefined;
  @Input() discipline: String | undefined;
  @Input() section: String | undefined;
  @Input() room: String | undefined;
}
