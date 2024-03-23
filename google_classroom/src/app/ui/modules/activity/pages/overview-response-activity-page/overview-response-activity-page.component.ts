import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { ActivityBusiness } from '../../../../business/activity_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { SetResponseMapper } from '../../../../../domain/models/mappers/set_response_activity_mapper';
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
  loadedResponses: SetResponseMapper[] | any[] = [];
  userId: String | null | undefined = null;

  @Input() activityId: String | undefined;
  @Input() userIsCreator: boolean | undefined;

  constructor(
    private activityBusiness: ActivityBusiness,
    private authBusiness: AuthBusiness,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {

    this.loadResponsees();
  }

  async loadResponsees() {
    this.errorMessage = null;

    try {
      const token = await this.authBusiness.getAuthToken();
      const responses = await this.activityBusiness.getResponsesActivity(token, this.activityId);

      if (responses) {
        this.userId = await this.authBusiness.getUserIdByToken(token);
        this.loadedResponses = responses; 
      } else {
        throw Error("Erro ao carregar respostas. Por favor, tente novamente mais tarde.")
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  async openCreateResponseActivityForm(): Promise<void> {
    const dialogRef = this.dialog.open(CreateResponseActivityPageComponent, {
      width: '500px', 
      data: {
        activityId: this.activityId,
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.loadResponsees();
    });
  }
}
