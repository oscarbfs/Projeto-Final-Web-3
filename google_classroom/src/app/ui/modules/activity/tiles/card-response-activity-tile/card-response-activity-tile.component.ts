import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { UpdateResponseActivityPageComponent } from '../../pages/update-response-activity-page/update-response-activity-page.component';
import { OverviewResponseActivityPageComponent } from '../../pages/overview-response-activity-page/overview-response-activity-page.component'; // Importe o componente pai

@Component({
  selector: 'gc-card-response-activity-tile',
  standalone: true,
  imports: [],
  templateUrl: './card-response-activity-tile.component.html',
  styleUrl: './card-response-activity-tile.component.css'
})
export class CardResponseActivityTileComponent {
  @Input() classId: String | undefined;
  @Input() activityId: String | undefined;
  @Input() activityUserName: String | undefined;
  @Input() activityMessage: String | undefined;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private parentComponent: OverviewResponseActivityPageComponent 
  ) {}

  openUpdateActivityForm(): void {
    const dialogRef = this.dialog.open(UpdateResponseActivityPageComponent, {
      width: '500px',
      data: {
        id: this.activityId,
        message: this.activityMessage,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.parentComponent.loadActivityes(); 
    });
  }
}
