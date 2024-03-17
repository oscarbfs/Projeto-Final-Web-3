import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { ActivityBusiness } from '../../../../business/activity_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { SetActivityMapper } from '../../../../../domain/models/mappers/set_activity_mapper';
import { CardResponseActivityTileComponent } from '../../tiles/card-response-activity-tile/card-response-activity-tile.component';
import { CreateResponseActivityPageComponent } from '../create-response-activity-page/create-response-activity-page.component';

@Component({
  selector: 'gc-overview-response-activity-page',
  templateUrl: './overview-response-activity-page.component.html',
  styleUrls: ['./overview-response-activity-page.component.css'],
  standalone: true,
  imports: [CommonModule, CardResponseActivityTileComponent]
})
export class OverviewResponseActivityPageComponent implements OnInit {
  errorMessage: String | null = null;
  loadedActivitys: SetActivityMapper[] | any[] = [];
  @Input() classId: String | undefined;

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
    const dialogRef = this.dialog.open(CreateResponseActivityPageComponent, {
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
