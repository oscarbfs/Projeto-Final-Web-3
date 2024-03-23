import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UpdateResponseActivityPageComponent } from '../../pages/update-response-activity-page/update-response-activity-page.component';
import { DeleteResponseActivityPageComponent } from '../../pages/delete-response-activity-page/delete-response-activity-page.component';
import { OverviewResponseActivityPageComponent } from '../../pages/overview-response-activity-page/overview-response-activity-page.component'; // Importe o componente pai

@Component({
  selector: 'gc-card-response-activity-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-response-activity-tile.component.html',
  styleUrl: './card-response-activity-tile.component.css'
})
export class CardResponseActivityTileComponent {
  @Input() userId: String | null | undefined = null;
  @Input() responseId: String | undefined;
  @Input() responseActivityId: String | undefined;
  @Input() responseUserId: String | undefined;
  @Input() responseUserName: String | undefined;
  @Input() responseText: String | undefined;
  @Input() responseCreatedAt: String | undefined;
  @Input() responseUpdatedAt: String | undefined;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private parentComponent: OverviewResponseActivityPageComponent 
  ) {}

  openUpdateResponseActivityForm(): void {
    const dialogRef = this.dialog.open(UpdateResponseActivityPageComponent, {
      width: '500px',
      data: {
        id: this.responseId,
        response: this.responseText,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.parentComponent.loadResponsees(); 
    });
  }

  openDeleteResponseActivityDialog(): void {
    const dialogRef = this.dialog.open(DeleteResponseActivityPageComponent, {
      width: '500px',
      data: {
        id: this.responseId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.parentComponent.loadResponsees(); 
    });
  }

  goToDetail() {
    this.router.navigate(['/detailResponseActivity', this.responseId]);
  }
}
