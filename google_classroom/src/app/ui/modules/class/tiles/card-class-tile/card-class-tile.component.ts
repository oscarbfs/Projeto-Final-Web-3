import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gc-card-class-tile',
  standalone: true,
  imports: [],
  templateUrl: './card-class-tile.component.html',
  styleUrl: './card-class-tile.component.css'
})
export class CardClassTileComponent {
  @Input() classId: String | undefined;
  @Input() className: String | undefined;
  @Input() discipline: String | undefined;
  @Input() section: String | undefined;
  @Input() room: String | undefined;

  constructor(
    private router: Router
  ) {}

  goToDetail() {
    this.router.navigate(['/detailClass', this.classId]);
  }
}
