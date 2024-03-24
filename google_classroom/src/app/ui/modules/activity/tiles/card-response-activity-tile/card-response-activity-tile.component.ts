import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gc-card-response-activity-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-response-activity-tile.component.html',
  styleUrl: './card-response-activity-tile.component.css'
})
export class CardResponseActivityTileComponent {
  @Input() userIsCreator: boolean | undefined;
  @Input() userId: String | null | undefined = null;
  @Input() responseId: String | undefined;
  @Input() responseActivityId: String | undefined;
  @Input() responseUserId: String | undefined;
  @Input() responseUserName: String | undefined;
  @Input() responseText: String | undefined;
  @Input() responseCreatedAt: string | undefined;
  @Input() responseUpdatedAt: string | undefined;

  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) {}

  responseCreatedAtDate: Date | undefined;
  responseUpdatedAtDate: Date | undefined;
  
  ngOnInit(): void {
    this.responseCreatedAtDate = this.responseCreatedAt ? new Date(this.responseCreatedAt) : undefined;
    this.responseUpdatedAtDate = this.responseUpdatedAt ? new Date(this.responseUpdatedAt) : undefined;
  }

  goToDetail() {
    if(this.userId === this.responseUserId || this.userIsCreator) {
      this.router.navigate(['/detailResponseActivity', this.responseId]);
    }
  }
}
