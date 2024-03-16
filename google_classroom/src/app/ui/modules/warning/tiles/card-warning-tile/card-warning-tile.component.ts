import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { UpdateWarningPageComponent } from '../../pages/update-warning-page/update-warning-page.component';
import { DeleteWarningPageComponent } from '../../pages/delete-warning-page/delete-warning-page.component';
import { OverviewWarningPageComponent } from '../../pages/overview-warning-page/overview-warning-page.component'; // Importe o componente pai

@Component({
  selector: 'gc-card-warning-tile',
  standalone: true,
  imports: [],
  templateUrl: './card-warning-tile.component.html',
  styleUrl: './card-warning-tile.component.css'
})
export class CardWarningTileComponent {
  @Input() classId: String | undefined;
  @Input() warningId: String | undefined;
  @Input() warningUserName: String | undefined;
  @Input() warningMessage: String | undefined;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private parentComponent: OverviewWarningPageComponent 
  ) {}

  openUpdateWarningForm(): void {
    const dialogRef = this.dialog.open(UpdateWarningPageComponent, {
      width: '500px',
      data: {
        id: this.warningId,
        message: this.warningMessage,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.parentComponent.loadWarninges(); 
    });
  }

  openDeleteWarningDialog(): void {
    const dialogRef = this.dialog.open(DeleteWarningPageComponent, {
      width: '500px',
      data: {
        id: this.warningId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.parentComponent.loadWarninges(); 
    });
  }
}
