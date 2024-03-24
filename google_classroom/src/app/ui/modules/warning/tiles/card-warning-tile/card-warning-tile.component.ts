import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { UpdateWarningPageComponent } from '../../pages/update-warning-page/update-warning-page.component';
import { DeleteWarningPageComponent } from '../../pages/delete-warning-page/delete-warning-page.component';
import { OverviewWarningPageComponent } from '../../pages/overview-warning-page/overview-warning-page.component'; // Importe o componente pai

@Component({
  selector: 'gc-card-warning-tile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './card-warning-tile.component.html',
  styleUrl: './card-warning-tile.component.css'
})
export class CardWarningTileComponent {
  @Input() classId: String | undefined;
  @Input() userId: String | null | undefined;
  @Input() warningId: String | undefined;
  @Input() warningUserId: String | undefined;
  @Input() warningUserName: String | undefined;
  @Input() warningMessage: String | undefined;
  @Input() warningCreatedAt: string | undefined;
  @Input() warningUpdatedAt: string | undefined;

  constructor(
    public dialog: MatDialog,
    private parentComponent: OverviewWarningPageComponent 
  ) {}

  warningCreatedAtDate: Date | undefined;
  warningUpdatedAtDate: Date | undefined;

  ngOnInit() {
    this.warningCreatedAtDate = this.warningCreatedAt ? new Date(this.warningCreatedAt) : undefined;
    this.warningUpdatedAtDate = this.warningUpdatedAt ? new Date(this.warningUpdatedAt) : undefined;
  }

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
