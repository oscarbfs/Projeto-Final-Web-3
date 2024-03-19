import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { ActivityBusiness } from '../../../../business/activity_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { SetActivityMapper } from '../../../../../domain/models/mappers/set_activity_mapper';
import { CardActivityTileComponent } from '../../tiles/card-activity-tile/card-activity-tile.component';
import { CreateActivityPageComponent } from '../create-activity-page/create-activity-page.component';

@Component({
  selector: 'gc-overview-activity-page',
  templateUrl: './overview-activity-page.component.html',
  styleUrls: ['./overview-activity-page.component.css'],
  standalone: true,
  imports: [CommonModule, CardActivityTileComponent]
})
export class OverviewActivityPageComponent implements OnInit {
  errorMessage: String | null = null;
  loadedActivitys: SetActivityMapper[] | any[] = [];
  @Input() classId: String | undefined;
  @Input() userIsCreator: boolean | undefined;

  constructor(
    private activityBusiness: ActivityBusiness,
    private authBusiness: AuthBusiness,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {

    this.loadActivityes();
  }

  async loadActivityes() {
    this.errorMessage = null;

    try {
      const token = await this.authBusiness.getAuthToken();
      const activitys = await this.activityBusiness.getClassActivitys(token, this.classId);

      if (activitys) {
        this.loadedActivitys = activitys; 
      } else {
        throw Error("Erro ao carregar avisos. Por favor, tente novamente mais tarde.")
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  async openCreateActivityForm(): Promise<void> {
    const dialogRef = this.dialog.open(CreateActivityPageComponent, {
      width: '500px', 
      data: {
        classId: this.classId,
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.loadActivityes();
    });
  }
}
