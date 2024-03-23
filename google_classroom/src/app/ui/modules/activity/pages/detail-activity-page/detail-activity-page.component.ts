import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { ActivityBusiness } from '../../../../business/activity_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { SetActivityMapper } from '../../../../../domain/models/mappers/set_activity_mapper';
import { SetResponseMapper } from '../../../../../domain/models/mappers/set_response_activity_mapper';
import { UpdateActivityPageComponent } from '../update-activity-page/update-activity-page.component';
import { DeleteActivityPageComponent } from '../delete-activity-page/delete-activity-page.component';
import { OverviewResponseActivityPageComponent } from '../overview-response-activity-page/overview-response-activity-page.component';

@Component({
  selector: 'gc-detail-activity-page',
  templateUrl: './detail-activity-page.component.html',
  styleUrls: ['./detail-activity-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    OverviewResponseActivityPageComponent,
  ],
})
export class DetailActivityPageComponent {
  errorMessage: string | null = null;
  activityToDetail: SetActivityMapper | null = null;
  activityResponses: SetResponseMapper[] | null = null;
  userIsCreator: boolean = false;
  activityId: string = "";

  constructor(
    private activityBusiness: ActivityBusiness,
    private authBusiness: AuthBusiness,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.activityId = params.get('id') ?? "";
    });

    this.getActivityData(this.activityId);
  }

  async getActivityData(activityId: string) {
    this.errorMessage = null;

    try {
      const token = await this.authBusiness.getAuthToken();
      const activityToDetail = await this.activityBusiness.getActivity(token, activityId);
      const activityResponsesToDetail = await this.activityBusiness.getResponsesActivity(token, activityId);
      
      if (activityToDetail && activityResponsesToDetail) {
        this.userIsCreator = await this.authBusiness.getUserIdByToken(token) === activityToDetail.activityUserId;
        this.activityToDetail = activityToDetail;
        this.activityResponses = activityResponsesToDetail;
      } else {
        throw new Error("Erro ao carregar turmas. Por favor, tente novamente mais tarde.");
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  openUpdateActivityForm(): void {
    const dialogRef = this.dialog.open(UpdateActivityPageComponent, {
      width: '500px',
      data: this.activityToDetail,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getActivityData(this.activityId);
    });
  }

  openDeleteActivityDialog(): void {
    this.dialog.open(DeleteActivityPageComponent, {
      width: '500px',
      data: this.activityToDetail,
    });
  }

  goBack(): void {
    this.router.navigate(['/detailClass', this.activityToDetail?.activityClassId]);
  }
}
