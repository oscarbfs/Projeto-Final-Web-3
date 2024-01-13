import { Component, Input } from '@angular/core';

@Component({
  selector: 'gc-card-class-tile',
  templateUrl: './card-class-tile.component.html',
  styleUrls: ['./card-class-tile.component.css']
})
export class CardClassTileComponent {
  @Input() turma: any;
}
