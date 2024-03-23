import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { ActivityBusiness } from '../../../../business/activity_business';
import { AuthBusiness } from '../../../../business/auth_business';
import { SetResponseMapper } from '../../../../../domain/models/mappers/set_response_activity_mapper';
import { UpdateResponseActivityPageComponent } from '../update-response-activity-page/update-response-activity-page.component';
import { DeleteResponseActivityPageComponent } from '../delete-response-activity-page/delete-response-activity-page.component';

@Component({
  selector: 'gc-detail-response-activity-page',
  templateUrl: './detail-response-activity-page.component.html',
  styleUrls: ['./detail-response-activity-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class DetailResponseActivityPageComponent {
  errorMessage: string | null = null;
  responseToDetail: SetResponseMapper | null = null;
  userIsCreator: boolean = false;
  responseId: string = "";

  constructor(
    private activityBusiness: ActivityBusiness,
    private authBusiness: AuthBusiness,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.responseId = params.get('id') ?? "";
    });

    this.getResponseActivityData(this.responseId);
  }

  async getResponseActivityData(responseId: string) {
    this.errorMessage = null;

    try {
      const token = await this.authBusiness.getAuthToken();
      const responseToDetail = await this.activityBusiness.getResponseActivity(token, responseId);
      
      if (responseToDetail) {
        this.userIsCreator = await this.authBusiness.getUserIdByToken(token) === responseToDetail.responseUserId;
        this.responseToDetail = responseToDetail;
      } else {
        throw new Error("Erro ao carregar turmas. Por favor, tente novamente mais tarde.");
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  openUpdateResponseActivityForm(): void {
    const dialogRef = this.dialog.open(UpdateResponseActivityPageComponent, {
      width: '500px',
      data: this.responseToDetail,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getResponseActivityData(this.responseId);
    });
  }

  openDeleteResponseActivityDialog(): void {
    this.dialog.open(DeleteResponseActivityPageComponent, {
      width: '500px',
      data: this.responseToDetail,
    });
  }

  goBack(): void {
    this.router.navigate(['/detailClass', this.responseToDetail?.responseClassId]);
  }
}
