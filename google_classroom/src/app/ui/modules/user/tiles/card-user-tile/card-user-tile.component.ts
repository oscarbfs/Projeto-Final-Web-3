import { Component, Input } from '@angular/core';

@Component({
  selector: 'gc-card-user-tile',
  standalone: true,
  imports: [],
  templateUrl: './card-user-tile.component.html',
  styleUrl: './card-user-tile.component.css'
})
export class CardUserTileComponent {
  @Input() userName: String | undefined;
  @Input() userEmail: String | undefined;

  ngOnInit(): void {
    console.log(this.userName)
    console.log(this.userEmail)
  }
}
