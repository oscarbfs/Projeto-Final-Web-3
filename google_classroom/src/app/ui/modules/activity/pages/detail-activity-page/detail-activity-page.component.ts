import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { SetActivityMapper } from '../../../../../domain/models/mappers/set_activity_mapper';
import { ActivityBusiness } from '../../../../business/activity_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { UpdateActivityPageComponent } from '../update-activity-page/update-activity-page.component';
import { DeleteActivityPageComponent } from '../delete-activity-page/delete-activity-page.component';

@Component({
  selector: 'gc-detail-activity-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './detail-activity-page.component.html',
  styleUrl: './detail-activity-page.component.css'
})
export class DetailActivityPageComponent {
  errorMessage: String | null = null;
  activityToDetail: SetActivityMapper | null = null;
  userIsCreator: boolean = false;
  activityId: String = "";

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

    this.getActivity(this.activityId);
  }

  async getActivity(activityId: String) {
    this.errorMessage = null;

    try {
      const token = await this.authBusiness.getAuthToken();
      const activityToDetail = await this.activityBusiness.getActivity(token, activityId);

      if (activityToDetail) {
        this.userIsCreator = await this.authBusiness.getUserIdByToken(token) === activityToDetail.activityUserId;
        this.activityToDetail = activityToDetail;
      } else {
        throw Error("Erro ao carregar turmas. Por favor, tente novamente mais tarde.")
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
      this.getActivity(this.activityId);
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
