import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { UpdateActivityPageComponent } from '../../pages/update-activity-page/update-activity-page.component';
import { DeleteActivityPageComponent } from '../../pages/delete-activity-page/delete-activity-page.component';
import { OverviewActivityPageComponent } from '../../pages/overview-activity-page/overview-activity-page.component'; // Importe o componente pai

@Component({
  selector: 'gc-card-activity-tile',
  standalone: true,
  imports: [],
  templateUrl: './card-activity-tile.component.html',
  styleUrl: './card-activity-tile.component.css'
})
export class CardActivityTileComponent {
  @Input() classId: String | undefined;
  @Input() activityId: String | undefined;
  @Input() activityUserName: String | undefined;
  @Input() activityMessage: String | undefined;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private parentComponent: OverviewActivityPageComponent 
  ) {}

  openUpdateActivityForm(): void {
    const dialogRef = this.dialog.open(UpdateActivityPageComponent, {
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

  openDeleteActivityDialog(): void {
    const dialogRef = this.dialog.open(DeleteActivityPageComponent, {
      width: '500px',
      data: {
        id: this.activityId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.parentComponent.loadActivityes(); 
    });
  }
}
