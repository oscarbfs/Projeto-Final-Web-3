import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetUserMapper } from '../../../../../domain/models/mappers/set_user_mapper';
import { CardUserTileComponent } from '../../tiles/card-user-tile/card-user-tile.component';

@Component({
  selector: 'gc-overview-user-page',
  templateUrl: './overview-user-page.component.html',
  styleUrls: ['./overview-user-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CardUserTileComponent,
  ],
})
export class OverviewUserPageComponent {
  @Input() members: SetUserMapper[] | undefined;
}
